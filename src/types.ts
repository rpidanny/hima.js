import { DirResult } from 'tmp'
export interface Context {
  rawOptions: ImageParams
  options?: Options
  output?: Success
}

export interface Success {
  output: string
}

export interface ImageParams {
  date?: string | Date
  zoom?: number
  parallel?: boolean
  infrared?: boolean
  output?: string
  timeout?: number
}

export interface Options {
  date?: string | Date
  zoom?: number
  parallel?: boolean
  infrared?: boolean
  output?: string
  timeout?: number
  imageType?: string
  level?: string
  now?: Date
  tiles?: Array<Tile>
  tempDir?: DirResult
}

export interface ZoomMappings {
  [name: number]: string
}

export interface ImageTypeToZoomMappings {
  INFRARED_FULL: ZoomMappings
  D531106: ZoomMappings
  [name: string]: ZoomMappings
}

export interface Config {
  baseUrl: string
  defaultZoom: string
}

export interface NextFunction {
  (): void
}

export interface Step {
  (ctx: Context, next: NextFunction): void
}

export interface Tile {
  name: string
  url: string
  x: number
  y: number
}
