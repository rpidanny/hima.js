import { buildImagesPipeline } from '../../utils/build-pipeline'
import optionsValidator from './steps/options-validator'
import optionsParser from './steps/options-parser'
import downloadDates from './steps/download-dates'

import { Context, RawOptions, Success } from './types'

const executor = buildImagesPipeline(optionsValidator, optionsParser, downloadDates)

export const downloadImages = async (options: RawOptions): Promise<Success> => {
  const ctx: Context = { rawOptions: options }

  await executor(ctx)

  if (ctx.output) {
    return ctx.output
  } else {
    throw new Error('Failed to perform task..')
  }
}
