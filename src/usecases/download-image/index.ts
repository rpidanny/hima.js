import buildPipeline from '../../utils/build-pipeline'
import optionsValidator from './steps/options-validator'
import optionsParser from './steps/options-parser'
import urlGenerator from './steps/url-generator'
import downloadTiles from './steps/download-tiles'
import stitchTiles from './steps/stitch-tiles'

import { Context, RawOptions, Success } from './types'

const executor = buildPipeline(
  optionsValidator,
  optionsParser,
  urlGenerator,
  downloadTiles,
  stitchTiles,
)

export const downloadImage = async (options: RawOptions): Promise<Success> => {
  const ctx: Context = { rawOptions: options }

  await executor(ctx)

  if (ctx.output) {
    return ctx.output
  } else {
    throw new Error('Failed to perform task..')
  }
}
