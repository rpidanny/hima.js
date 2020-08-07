import { buildTimelapsePipeline } from '../../utils/build-pipeline'
import optionsValidator from './steps/options-validator'
import optionsParser from './steps/options-parser'
import mergeImages from './steps/merge-images'

import { Context, RawOptions, Success } from './types'

const executor = buildTimelapsePipeline(optionsValidator, optionsParser, mergeImages)

export const createTimelapse = async (options: RawOptions): Promise<Success> => {
  const ctx: Context = { rawOptions: options }

  await executor(ctx)

  if (ctx.output) {
    return ctx.output
  } else {
    throw new Error('Failed to perform task..')
  }
}
