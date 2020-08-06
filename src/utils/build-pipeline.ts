import * as types from '../usecases/download-image/types'

const noop = async (): Promise<void> => {
  // No operations performed
}

export default (...steps: Array<types.Step>) => (ctx: types.Context): void =>
  steps.reduceRight((next: types.NextFunction, step: types.Step): types.NextFunction => {
    return () => step(ctx, next)
  }, noop)()
