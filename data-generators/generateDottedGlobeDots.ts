import * as Fs from 'node:fs'
import * as Path from 'node:path'
import { fileURLToPath } from 'node:url'
import { geoContains } from 'd3-geo'
import { feature } from 'topojson-client'
import world from 'world-atlas/land-110m.json'

type Dot = {
  id: number
  lat: number
  lon: number
  sinLat: number
  cosLat: number
  lonRad: number
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const land = feature(
    world as any,
    (world as any).objects.land,
) as any

function toRad(deg: number) {
  return deg * Math.PI / 180
}

function roundCoordinate(value: number) {
  return Number(value.toFixed(6))
}

function generateLandDots() {
  const dots: Dot[] = []
  let id = 0

  // smaller = denser; larger = cleaner / fewer dots
  const step = 2.1

  for (let lat = -58; lat <= 75; lat += step) {
    const rowOffset = Math.round((lat + 90) / step) % 2 ? step / 2 : 0

    for (let lon = -180; lon <= 180; lon += step) {
      const adjustedLon = lon + rowOffset

      if (geoContains(land, [adjustedLon, lat])) {
        const latRad = toRad(lat)

        dots.push({
          id: id++,
          lat: roundCoordinate(lat),
          lon: roundCoordinate(adjustedLon),
          sinLat: roundCoordinate(Math.sin(latRad)),
          cosLat: roundCoordinate(Math.cos(latRad)),
          lonRad: roundCoordinate(toRad(adjustedLon)),
        })
      }
    }
  }

  return dots
}

function main() {
  const dots = generateLandDots()
  const dataDir = Path.join(__dirname, '..', 'public', 'data')
  const filePath = Path.join(dataDir, 'dottedGlobeLandDots.json')

  if (!Fs.existsSync(dataDir)) {
    Fs.mkdirSync(dataDir, { recursive: true })
  }

  Fs.writeFileSync(filePath, `${JSON.stringify(dots)}\n`)
  console.log(`Generated ${dots.length} dotted globe land dots at ${filePath}`)
}

main()
