export interface Context {
  options: ImageParams
  req?: ImageParams
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
  date?: string
  zoom?: number
  parallel?: boolean
  infrared?: boolean
  output: string
  timeout?: number
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
