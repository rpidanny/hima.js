import buildPipeline from './utils/build-pipeline'
import optionsValidator from './steps/options-validator'
import optionsParser from './steps/options-parser'
import urlGenerator from './steps/url-generator'
import downloadTiles from './steps/download-tiles'
import stitchTiles from './steps/stitch-tiles'

import * as types from './types'

const executor = buildPipeline(
  optionsValidator,
  optionsParser,
  urlGenerator,
  downloadTiles,
  stitchTiles,
)

export const hima = async (options: types.RawOptions): Promise<types.Success> => {
  const ctx: types.Context = { rawOptions: options }

  await executor(ctx)

  if (ctx.output) {
    return ctx.output
  } else {
    throw new Error('Failed to perform task..')
  }
}
