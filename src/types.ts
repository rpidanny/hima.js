export interface Context {
  options: ImageParams
  validatedOptions?: ImageParams
  parsedOptions?: ParsedOptions
  output?: Success
}

export interface Success {
  status: string
}

export interface Failure {
  message: string
  code: number
}

export interface ImageParams {
  date?: string | Date
  zoom?: number
  parallel?: boolean
  infrared?: boolean
  output: string
  timeout?: number
}

export interface ParsedOptions {
  date?: string | Date
  zoom?: number
  parallel?: boolean
  infrared?: boolean
  output: string
  timeout?: number
  imageType?: string
  level?: string
  now?: Date
  tiles?: Array<Tile>
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

export interface Middleware {
  (ctx: Context, next: NextFunction): void
}

export interface Tile {
  name: string
  url: string
  x: number
  y: number
}
