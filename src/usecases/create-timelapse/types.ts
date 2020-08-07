import { ProgressFunction, LogFunction, Timeout, NextFunction } from '../../types'
import * as imagesTypes from '../download-images/types'

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
  startDate: string | Date
  endDate: string | Date
  interval?: number
  quality?: string
  infrared?: boolean
  output?: string
  timeout?: Timeout
  batchSize?: number
  debug?: boolean
  progress?: ProgressFunction
}

export interface Options {
  startDate: string | Date
  endDate: string | Date
  interval?: number
  quality?: string
  infrared?: boolean
  output?: string
  timeout?: Timeout
  batchSize?: number
  debug?: boolean
  log?: LogFunction
  progress?: ProgressFunction
  images: imagesTypes.Success
}
