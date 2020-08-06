import { NextFunction } from '../types'
import { Step, Context } from '../usecases/download-image/types'

const noop = async (): Promise<void> => {
  // No operations performed
}

export default (...steps: Array<Step>) => (ctx: Context): void =>
  steps.reduceRight((next: NextFunction, step: Step): NextFunction => {
    return () => step(ctx, next)
  }, noop)()
