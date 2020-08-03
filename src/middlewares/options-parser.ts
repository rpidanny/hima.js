import * as types from '../types'

export default async (ctx: types.Context, next: types.NextFunction): Promise<void> => {
  const { req } = ctx
  console.log(req)
  await next()
}
