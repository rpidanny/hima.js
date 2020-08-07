import { DirResult } from 'tmp'

import { ProgressFunction, LogFunction, Timeout, NextFunction } from '../../types'

export interface Context {
  rawOptions: RawOptions
  options?: Options
  output?: Success
}

export interface Step {
  (ctx: Context, next: NextFunction): void
}

export interface Success {
  output: string
}

export interface RawOptions {
  date?: string | Date
  zoom?: number
  infrared?: boolean
  output?: string
  timeout?: Timeout
  batchSize?: number
  debug?: boolean
  progress?: ProgressFunction
}

export interface Options {
  date?: string | Date
  zoom?: number
  infrared?: boolean
  output?: string
  timeout?: Timeout
  imageType?: string
  level?: string
  now?: Date
  tiles?: Array<Tile>
  tempDir?: DirResult
  batchSize?: number
  debug?: boolean
  log?: LogFunction
  progress?: ProgressFunction
}

export interface Tile {
  name: string
  url: string
  x: number
  y: number
}
