import * as types from '../types'

const noop = async (): Promise<void> => {
  // No operations performed
}

export default (...middlewares: Array<types.Middleware>) => (ctx: types.Context): void =>
  middlewares.reduceRight(
    (next: types.NextFunction, middleware: types.Middleware): types.NextFunction => {
      return () => middleware(ctx, next)
    },
    noop,
  )()
