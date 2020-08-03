import buildMiddlewares from './utils/build-middlewares'
import optionsValidator from './middlewares/options-validator'
import optionsParser from './middlewares/options-parser'
import urlGenerator from './middlewares/url-generator'

import * as types from './types'

const executor = buildMiddlewares(optionsValidator, optionsParser, urlGenerator)

export const hima = async (options: types.ImageParams): Promise<types.Success | types.Failure> => {
  const ctx: types.Context = { options }

  await executor(ctx)

  if (ctx.output) {
    return ctx.output
  } else {
    throw new Error('Failed to perform task..')
  }
}
