import got from 'got'
import * as types from '../../src/types'
import * as imageTypes from '../../src/usecases/download-image/types'

export const createMockHttpImageStep = (url: string) => async (
  ctx: imageTypes.Context,
  next: types.NextFunction,
): Promise<void> => {
  const resp = await got(url, { retry: 0 })
  ctx.output = {
    output: resp.body.toString(),
  }
  await next()
}
