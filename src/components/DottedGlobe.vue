<template>
  <div ref="globeRef" class="dotted-globe w-full">
    <div class="globe-glow" />
    <canvas ref="canvasRef" class="globe-canvas" aria-hidden="true" />
  </div>
</template>

<script lang="ts">
import { shallowRef } from 'vue'

type Dot = {
  id: number
  lat: number
  lon: number
  sinLat: number
  cosLat: number
  lonRad: number
}

type ProjectedPoint = {
  id?: number
  x: number
  y: number
  z: number
  opacity: number
  visible: boolean
}

type ActiveConnection = {
  id: number
  fromId: number
  mode: 'curve' | 'chord'
  startedAt: number
  toId?: number
  toPoint?: ProjectedPoint
}

const rawDots = shallowRef<Dot[]>([])
const dotsById = shallowRef(new Map<number, Dot>())

function toRad(deg: number) {
  return deg * Math.PI / 180
}

fetch('/data/dottedGlobeLandDots.json')
    .then(response => response.json())
    .then((generatedDots: Dot[]) => {
      rawDots.value = generatedDots
      dotsById.value = new Map(generatedDots.map(dot => [dot.id, dot]))
    })
    .catch(error => {
      console.error('Failed to load dotted globe land dots', error)
    })
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  dotSize?: number
  rotationSpeed?: number
  pulseInterval?: number
}>(), {
  dotSize: 4,
  rotationSpeed: 0.01,
  pulseInterval: 2400,
})

const defaultCoordinateSize = 560
const globeRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const arcFadeDuration = computed(() => props.pulseInterval * 2.25)

const targetFrameMs = 1000 / 30

let raf = 0
let last = 0
let rotation = -20
let coordinateSize = defaultCoordinateSize
let globeRadius = defaultCoordinateSize / 2
let globeCenter = defaultCoordinateSize / 2
let canvasPadding = 0
let devicePixelRatio = 1
let isVisible = true
let prefersReducedMotion = false
let resizeObserver: ResizeObserver | undefined
let intersectionObserver: IntersectionObserver | undefined
let reducedMotionQuery: MediaQueryList | undefined
let reducedMotionListener: ((event: MediaQueryListEvent) => void) | undefined
let pulseTimer: number | undefined
let openingPulseTimers: number[] = []
let connectionTimers: number[] = []
let connectionId = 0
let activeConnections: ActiveConnection[] = []

function getContext() {
  return canvasRef.value?.getContext('2d') || null
}

function projectDot(dot: Dot): ProjectedPoint {
  const lonRad = dot.lonRad + toRad(rotation)
  const x = canvasPadding + globeCenter + globeRadius * dot.cosLat * Math.sin(lonRad)
  const y = canvasPadding + globeCenter - globeRadius * dot.sinLat
  const z = dot.cosLat * Math.cos(lonRad)
  const visible = z > 0.08

  return {
    id: dot.id,
    x,
    y,
    z,
    visible,
    opacity: visible ? Math.max(0.12, Math.min(1, z + 0.25)) : 0,
  }
}

function getDotById(id: number) {
  return dotsById.value.get(id) || null
}

function getActiveDotIds() {
  const ids = new Set<number>()

  activeConnections.forEach(connection => {
    ids.add(connection.fromId)

    if (connection.toId !== undefined) {
      ids.add(connection.toId)
    }
  })

  return ids
}

function getVisibleDots(minimumOpacity = 0) {
  return rawDots.value
      .map(projectDot)
      .filter(dot => dot.visible && dot.opacity > minimumOpacity)
}

function getArcControlPoint(a: { x: number, y: number }, b: { x: number, y: number }) {
  const center = canvasPadding + globeCenter
  const midX = (a.x + b.x) / 2
  const midY = (a.y + b.y) / 2

  let outwardX = midX - center
  let outwardY = midY - center
  let outwardLength = Math.sqrt(outwardX * outwardX + outwardY * outwardY)

  if (outwardLength < globeRadius * 0.12) {
    const chordX = b.x - a.x
    const chordY = b.y - a.y

    outwardX = -chordY
    outwardY = chordX

    if (outwardY > 0) {
      outwardX *= -1
      outwardY *= -1
    }

    outwardLength = Math.sqrt(outwardX * outwardX + outwardY * outwardY)
  }

  const distanceOutsideGlobe = Math.min(110, Math.max(54, globeRadius * 0.18))
  const controlRadius = globeRadius + distanceOutsideGlobe

  return {
    x: center + (outwardX / outwardLength) * controlRadius,
    y: center + (outwardY / outwardLength) * controlRadius,
  }
}

function pickRandomVisibleDot() {
  const visible = getVisibleDots(0.55)

  if (!visible.length) return null

  return visible[Math.floor(Math.random() * visible.length)]
}

function pickRandomDistantVisibleDot(from: ProjectedPoint) {
  const minimumDistance = coordinateSize * 0.24
  const visible = getVisibleDots().filter(dot => {
    const dx = dot.x - from.x
    const dy = dot.y - from.y

    return dot.id !== from.id && Math.sqrt(dx * dx + dy * dy) > minimumDistance
  })

  if (!visible.length) return null

  return visible[Math.floor(Math.random() * visible.length)]
}

function pickRandomCrossGlobeDot(from: ProjectedPoint) {
  const center = canvasPadding + globeCenter
  const fromSide = from.x < center ? -1 : 1
  const candidates = getVisibleDots().filter(dot => {
    if (dot.id === from.id) return false

    const toSide = dot.x < center ? -1 : 1
    if (fromSide === toSide) return false

    const dx = dot.x - from.x
    const dy = dot.y - from.y
    const length = Math.sqrt(dx * dx + dy * dy)
    if (length < globeRadius * 0.9) return false

    const distanceFromCenterToLine = Math.abs(
        dx * (from.y - center) - (from.x - center) * dy,
    ) / length

    return distanceFromCenterToLine < globeRadius * 0.38
  })

  if (!candidates.length) return null

  return candidates[Math.floor(Math.random() * candidates.length)]
}

function createSyntheticWrapPoint(from: { x: number, y: number }): ProjectedPoint {
  const center = canvasPadding + globeCenter
  const angleFromCenter = Math.atan2(from.y - center, from.x - center)
  const angle = angleFromCenter + (Math.random() - 0.5) * Math.PI * 0.9

  return {
    x: center + Math.cos(angle) * globeRadius,
    y: center + Math.sin(angle) * globeRadius,
    z: -0.2,
    opacity: 0,
    visible: false,
  }
}

function removeConnection(id: number) {
  activeConnections = activeConnections.filter(connection => connection.id !== id)
}

function pickRandomConnection() {
  if (prefersReducedMotion || !isVisible) return

  const from = pickRandomVisibleDot()
  if (!from || from.id === undefined) return

  const connectionStyle = Math.random()
  const id = connectionId++
  const startedAt = performance.now()
  let connection: ActiveConnection | null = null

  if (connectionStyle < 0.4) {
    const to = pickRandomCrossGlobeDot(from) || pickRandomDistantVisibleDot(from)

    if (!to || to.id === undefined) return

    connection = {
      id,
      fromId: from.id,
      mode: 'chord',
      startedAt,
      toId: to.id,
    }
  } else if (connectionStyle < 0.8) {
    connection = {
      id,
      fromId: from.id,
      mode: 'curve',
      startedAt,
      toPoint: createSyntheticWrapPoint(from),
    }
  } else {
    const to = pickRandomDistantVisibleDot(from)

    if (!to || to.id === undefined) return

    connection = {
      id,
      fromId: from.id,
      mode: 'curve',
      startedAt,
      toId: to.id,
    }
  }

  activeConnections = [
    ...activeConnections.slice(-5),
    connection,
  ]

  const timeout = window.setTimeout(() => {
    removeConnection(id)
    connectionTimers = connectionTimers.filter(timer => timer !== timeout)
  }, arcFadeDuration.value)

  connectionTimers.push(timeout)
}

function getArcOpacity(connection: ActiveConnection, now: number) {
  const progress = Math.min(1, Math.max(0, (now - connection.startedAt) / arcFadeDuration.value))

  if (progress < 0.2) {
    return progress / 0.2
  }

  if (progress < 0.72) {
    return 1
  }

  return Math.max(0, 1 - (progress - 0.72) / 0.28)
}

function drawDots(ctx: CanvasRenderingContext2D) {
  const activeDotIds = getActiveDotIds()
  const skip = coordinateSize < 520 ? 2 : 1

  ctx.save()
  ctx.beginPath()
  ctx.arc(canvasPadding + globeCenter, canvasPadding + globeCenter, globeRadius, 0, Math.PI * 2)
  ctx.clip()

  rawDots.value.forEach((dot, index) => {
    const active = activeDotIds.has(dot.id)
    if (!active && index % skip !== 0) return

    const projected = projectDot(dot)
    if (!projected.visible) return

    const radius = (props.dotSize / 2) * (active ? 2.1 : 1)

    ctx.globalAlpha = projected.opacity
    ctx.fillStyle = active ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.78)'
    ctx.shadowBlur = active ? 18 : 4
    ctx.shadowColor = active ? 'rgba(255, 255, 255, 0.46)' : 'rgba(255, 255, 255, 0.10)'
    ctx.beginPath()
    ctx.arc(projected.x, projected.y, radius, 0, Math.PI * 2)
    ctx.fill()
  })

  ctx.restore()
}

function drawArcs(ctx: CanvasRenderingContext2D, now: number) {
  ctx.save()
  ctx.lineWidth = 1.25
  ctx.lineCap = 'round'
  ctx.setLineDash([6, 10])
  ctx.lineDashOffset = -((now / 2400) * 120) % 120
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.82)'
  ctx.shadowBlur = 5
  ctx.shadowColor = 'rgba(255, 255, 255, 0.4)'

  activeConnections.forEach(connection => {
    const from = getDotById(connection.fromId)
    const to = connection.toId !== undefined ? getDotById(connection.toId) : null

    if (!from) return

    const a = projectDot(from)
    const b = to ? projectDot(to) : connection.toPoint

    if (!a.visible || !b || (to && !b.visible)) return

    ctx.globalAlpha = getArcOpacity(connection, now)
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)

    if (connection.mode === 'chord') {
      ctx.lineTo(b.x, b.y)
    } else {
      const control = getArcControlPoint(a, b)
      ctx.quadraticCurveTo(control.x, control.y, b.x, b.y)
    }

    ctx.stroke()
  })

  ctx.restore()
}

function drawGlobe(now: number) {
  const ctx = getContext()
  if (!ctx || !canvasRef.value) return

  const canvasSize = coordinateSize + canvasPadding * 2

  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
  ctx.clearRect(0, 0, canvasSize, canvasSize)

  drawDots(ctx)
  drawArcs(ctx, now)

  ctx.save()
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(canvasPadding + globeCenter, canvasPadding + globeCenter, globeRadius - 0.5, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()
}

function updateCanvasSize() {
  if (!globeRef.value || !canvasRef.value) return

  coordinateSize = Math.max(1, globeRef.value.getBoundingClientRect().width)
  globeRadius = coordinateSize / 2
  globeCenter = coordinateSize / 2
  canvasPadding = Math.ceil(Math.min(110, Math.max(54, globeRadius * 0.18)) + 24)
  devicePixelRatio = Math.min(window.devicePixelRatio || 1, coordinateSize < 520 ? 1.5 : 2)

  const canvasSize = coordinateSize + canvasPadding * 2

  canvasRef.value.width = Math.ceil(canvasSize * devicePixelRatio)
  canvasRef.value.height = Math.ceil(canvasSize * devicePixelRatio)
  canvasRef.value.style.width = `${canvasSize}px`
  canvasRef.value.style.height = `${canvasSize}px`
  canvasRef.value.style.left = `${-canvasPadding}px`
  canvasRef.value.style.top = `${-canvasPadding}px`

  drawGlobe(performance.now())
}

function animate(now: number) {
  const delta = now - last

  if (isVisible && delta >= targetFrameMs) {
    last = now

    if (!prefersReducedMotion) {
      rotation += props.rotationSpeed * delta
    }

    drawGlobe(now)
  }

  raf = requestAnimationFrame(animate)
}

onMounted(() => {
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion = reducedMotionQuery.matches
  reducedMotionListener = event => {
    prefersReducedMotion = event.matches
    drawGlobe(performance.now())
  }
  reducedMotionQuery.addEventListener('change', reducedMotionListener)

  updateCanvasSize()

  if (globeRef.value) {
    resizeObserver = new ResizeObserver(updateCanvasSize)
    resizeObserver.observe(globeRef.value)

    intersectionObserver = new IntersectionObserver(entries => {
      isVisible = entries.some(entry => entry.isIntersecting)
    })
    intersectionObserver.observe(globeRef.value)
  }

  raf = requestAnimationFrame((now) => {
    last = now
    drawGlobe(now)
    raf = requestAnimationFrame(animate)
  })

  pickRandomConnection()
  openingPulseTimers = [
    window.setTimeout(pickRandomConnection, props.pulseInterval * 0.28),
    window.setTimeout(pickRandomConnection, props.pulseInterval * 0.56),
  ]

  pulseTimer = window.setInterval(() => {
    pickRandomConnection()
  }, props.pulseInterval * 0.48)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  cancelAnimationFrame(raf)

  if (reducedMotionQuery && reducedMotionListener) {
    reducedMotionQuery.removeEventListener('change', reducedMotionListener)
  }

  if (pulseTimer) {
    window.clearInterval(pulseTimer)
  }

  openingPulseTimers.forEach(timer => window.clearTimeout(timer))
  connectionTimers.forEach(timer => window.clearTimeout(timer))
})
</script>

<style scoped>
.dotted-globe {
  aspect-ratio: 1 / 1;
  overflow: visible;
  isolation: isolate;
  pointer-events: none;
}

.globe-glow {
  position: absolute;
  inset: 0%;
  border-radius: 100%;
  background:
      radial-gradient(
          circle at 50% 50%,
          rgba(237, 124, 255, 0.45),
          rgba(237, 124, 255, 0.065) 65%,
          transparent 72%
      );
}

.globe-canvas {
  position: absolute;
  pointer-events: none;
  z-index: 2;
}
</style>
