export interface Config {
  baseUrl: string
  defaultZoom: string
}

export interface ProgressFunction {
  (index: number, total: number): void
}

export interface LogFunction {
  (...msgs: Array<string>): void
}

export interface Timeout {
  connect: number
  request: number
  response: number
}

export interface NextFunction {
  (): void
}
