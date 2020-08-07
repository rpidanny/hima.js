import { ProgressFunction, LogFunction, Timeout, NextFunction } from '../../types'
import * as imageTypes from '../download-image/types'

export interface Context {
  rawOptions: RawOptions
  options?: Options
  output?: Success
}

export interface Step {
  (ctx: Context, next: NextFunction): void
}

export interface Success {
  images: Array<imageTypes.Success>
}

export interface RawOptions {
  startDate: string | Date
  endDate: string | Date
  interval?: number
  zoom?: number
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
  zoom?: number
  infrared?: boolean
  output?: string
  timeout?: Timeout
  batchSize?: number
  debug?: boolean
  log?: LogFunction
  progress?: ProgressFunction
  dates?: Array<Date>
}
