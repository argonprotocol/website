<template>
  <div
      ref="globeRef"
      class="dotted-globe w-full"
      :style="{
      '--arc-fade-duration': `${arcFadeDuration}ms`,
    }"
  >
    <div class="globe-glow" />

    <div class="sphere-mask">
      <div
          v-for="dot in renderedDots"
          :key="dot.id"
          class="dot"
          :class="{ active: dot.active }"
          :style="{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          opacity: dot.opacity,
          transform: `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${dot.scale})`,
        }"
      />
    </div>

    <svg
        class="arc-layer"
        :viewBox="`0 0 ${coordinateSize} ${coordinateSize}`"
        aria-hidden="true"
    >
      <path
          v-for="arc in renderedArcs"
          :key="arc.id"
          class="arc"
          :d="arc.path"
      />
    </svg>
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
  x: number
  y: number
  z: number
  visible: boolean
}

type ActiveConnection = {
  id: number
  fromId: number
  mode: 'curve' | 'chord'
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
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const props = withDefaults(defineProps<{
  dotSize?: number
  rotationSpeed?: number
  pulseInterval?: number
}>(), {
  dotSize: 4,
  rotationSpeed: 0.01,
  pulseInterval: 2400,
});

const defaultCoordinateSize = 560
const globeRef = ref<HTMLElement | null>(null)
const coordinateSize = ref(defaultCoordinateSize)

const rotation = ref(-20)
const activeConnections = ref<ActiveConnection[]>([])

const targetFrameMs = 1000 / 30

let raf = 0
let last = 0
let pulseTimer: number | undefined
let openingPulseTimers: number[] = []
let connectionTimers: number[] = []
let connectionId = 0
let resizeObserver: ResizeObserver | undefined

const globeRadius = computed(() => coordinateSize.value / 2)
const globeCenter = computed(() => coordinateSize.value / 2)
const rotationRad = computed(() => toRad(rotation.value))
const arcFadeDuration = computed(() => props.pulseInterval * 2.25)

function projectDot(dot: Dot) {
  const radius = globeRadius.value
  const center = globeCenter.value
  const lonRad = dot.lonRad + rotationRad.value

  const x = center + radius * dot.cosLat * Math.sin(lonRad)
  const y = center - radius * dot.sinLat
  const z = dot.cosLat * Math.cos(lonRad)

  return {
    x,
    y,
    z,
    visible: z > 0.08,
  }
}

function getDotById(id: number) {
  return dotsById.value.get(id) || null
}

const activeDotIds = computed(() => {
  const ids = new Set<number>()

  activeConnections.value.forEach(connection => {
    ids.add(connection.fromId)

    if (connection.toId !== undefined) {
      ids.add(connection.toId)
    }
  })

  return ids
})

const renderedDots = computed(() => {
  return rawDots.value
      .map(dot => {
        const projected = projectDot(dot)

        const edgeFade = Math.max(0.12, Math.min(1, projected.z + 0.25))
        const active = activeDotIds.value.has(dot.id)

        return {
          ...dot,
          ...projected,
          active,
          opacity: projected.visible ? edgeFade : 0,
          scale: active ? 2.1 : 1,
        }
      })
      .filter(dot => dot.visible)
})

function getArcControlPoint(a: { x: number, y: number }, b: { x: number, y: number }) {
  const center = globeCenter.value
  const radius = globeRadius.value
  const midX = (a.x + b.x) / 2
  const midY = (a.y + b.y) / 2

  let outwardX = midX - center
  let outwardY = midY - center
  let outwardLength = Math.sqrt(outwardX * outwardX + outwardY * outwardY)

  if (outwardLength < radius * 0.12) {
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

  const distanceOutsideGlobe = Math.min(110, Math.max(54, radius * 0.18))
  const controlRadius = radius + distanceOutsideGlobe

  return {
    x: center + (outwardX / outwardLength) * controlRadius,
    y: center + (outwardY / outwardLength) * controlRadius,
  }
}

const renderedArcs = computed(() => {
  return activeConnections.value
      .map(connection => {
        const from = getDotById(connection.fromId)
        const to = connection.toId !== undefined ? getDotById(connection.toId) : null

        if (!from) return null

        const a = projectDot(from)
        const b = to ? projectDot(to) : connection.toPoint

        if (!a.visible || !b || (to && !b.visible)) return null

        if (connection.mode === 'chord') {
          return {
            id: connection.id,
            path: `M ${a.x} ${a.y} L ${b.x} ${b.y}`,
          }
        }

        const control = getArcControlPoint(a, b)

        return {
          id: connection.id,
          path: `M ${a.x} ${a.y} Q ${control.x} ${control.y} ${b.x} ${b.y}`,
        }
      })
      .filter((arc): arc is { id: number, path: string } => Boolean(arc))
})

function pickRandomVisibleDot() {
  const visible = renderedDots.value.filter(dot => dot.opacity > 0.55)

  if (!visible.length) return null

  return visible[Math.floor(Math.random() * visible.length)]
}

function pickRandomDistantVisibleDot(from: { id: number, x: number, y: number }) {
  const minimumDistance = coordinateSize.value * 0.24
  const visible = renderedDots.value.filter(dot => {
    const dx = dot.x - from.x
    const dy = dot.y - from.y

    return dot.id !== from.id && Math.sqrt(dx * dx + dy * dy) > minimumDistance
  })

  if (!visible.length) return null

  return visible[Math.floor(Math.random() * visible.length)]
}

function pickRandomCrossGlobeDot(from: { id: number, x: number, y: number }) {
  const center = globeCenter.value
  const radius = globeRadius.value
  const fromSide = from.x < center ? -1 : 1
  const candidates = renderedDots.value.filter(dot => {
    if (dot.id === from.id) return false

    const toSide = dot.x < center ? -1 : 1
    if (fromSide === toSide) return false

    const dx = dot.x - from.x
    const dy = dot.y - from.y
    const length = Math.sqrt(dx * dx + dy * dy)
    if (length < radius * 0.9) return false

    const distanceFromCenterToLine = Math.abs(
        dx * (from.y - center) - (from.x - center) * dy,
    ) / length

    return distanceFromCenterToLine < radius * 0.38
  })

  if (!candidates.length) return null

  return candidates[Math.floor(Math.random() * candidates.length)]
}

function createSyntheticWrapPoint(from: { x: number, y: number }) {
  const center = globeCenter.value
  const radius = globeRadius.value
  const angleFromCenter = Math.atan2(from.y - center, from.x - center)
  const angle = angleFromCenter + (Math.random() - 0.5) * Math.PI * 0.9

  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
    z: -0.2,
    visible: false,
  }
}

function removeConnection(id: number) {
  activeConnections.value = activeConnections.value.filter(connection => connection.id !== id)
}

function pickRandomConnection() {
  const from = pickRandomVisibleDot()
  if (!from) return

  const connectionStyle = Math.random()
  const id = connectionId++
  let connection: ActiveConnection | null = null

  if (connectionStyle < 0.4) {
    const to = pickRandomCrossGlobeDot(from) || pickRandomDistantVisibleDot(from)

    if (!to) return

    connection = {
      id,
      fromId: from.id,
      mode: 'chord',
      toId: to.id,
    }
  } else if (connectionStyle < 0.8) {
    connection = {
      id,
      fromId: from.id,
      mode: 'curve',
      toPoint: createSyntheticWrapPoint(from),
    }
  } else {
    const to = pickRandomDistantVisibleDot(from)

    if (!to) return

    connection = {
      id,
      fromId: from.id,
      mode: 'curve',
      toId: to.id,
    }
  }

  activeConnections.value = [
    ...activeConnections.value.slice(-5),
    connection,
  ]

  const timeout = window.setTimeout(() => {
    removeConnection(id)
    connectionTimers = connectionTimers.filter(timer => timer !== timeout)
  }, arcFadeDuration.value)

  connectionTimers.push(timeout)
}

function animate(now: number) {
  const delta = now - last
  if (delta >= targetFrameMs) {
    last = now
    rotation.value += props.rotationSpeed * delta
  }

  raf = requestAnimationFrame(animate)
}

function updateCoordinateSize() {
  if (!globeRef.value) return

  coordinateSize.value = Math.max(1, globeRef.value.getBoundingClientRect().width)
}

onMounted(() => {
  updateCoordinateSize()

  if (globeRef.value) {
    resizeObserver = new ResizeObserver(updateCoordinateSize)
    resizeObserver.observe(globeRef.value)
  }

  raf = requestAnimationFrame((now) => {
    last = now
    raf = requestAnimationFrame(animate)
  })

  pickRandomConnection()
  openingPulseTimers = [
    window.setTimeout(pickRandomConnection, props.pulseInterval * 0.28),
    window.setTimeout(pickRandomConnection, props.pulseInterval * 0.56),
  ];

  pulseTimer = window.setInterval(() => {
    pickRandomConnection()
  }, props.pulseInterval * 0.48);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  cancelAnimationFrame(raf)

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

.sphere-mask {
  position: absolute;
  inset: 0;
  border-radius: 100%;
  overflow: hidden;
}

.sphere-mask::before {
  content: "";
  position: absolute;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
  top: 0;
  left: 0;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.25);
}

.dot {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 100%;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.10);
  transition:
      box-shadow 260ms ease,
      background 260ms ease;
}

.dot.active {
  background: rgba(255, 255, 255, 1);
  box-shadow:
      0 0 8px rgba(255, 255, 255, 0.85),
      0 0 18px rgba(255, 255, 255, 0.38);
  z-index: 3;
}

.arc-layer {
  position: absolute;
  inset: 0;
  overflow: visible;
  pointer-events: none;
  z-index: 4;
}

.arc {
  fill: none;
  stroke: rgba(255, 255, 255, 0.82);
  stroke-width: 1.25;
  stroke-linecap: round;
  stroke-dasharray: 6 10;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.4));
  animation:
      arc-draw 850ms ease-out both,
      arc-fade var(--arc-fade-duration) ease-in-out both,
      arc-dash 2.4s linear infinite;
}

@keyframes arc-draw {
  from {
    stroke-dashoffset: 240;
  }

  to {
    stroke-dashoffset: 0;
  }
}

@keyframes arc-fade {
  0% {
    opacity: 0;
  }

  20% {
    opacity: 1;
  }

  72% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes arc-dash {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: -120;
  }
}
</style>
