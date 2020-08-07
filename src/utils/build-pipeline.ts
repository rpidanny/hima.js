import { NextFunction } from '../types'
import * as imageTypes from '../usecases/download-image/types'
import * as imagesTypes from '../usecases/download-images/types'

const noop = async (): Promise<void> => {
  // No operations performed
}

const buildImagePipeline = (...steps: Array<imageTypes.Step>) => (ctx: imageTypes.Context): void =>
  steps.reduceRight((next: NextFunction, step: imageTypes.Step): NextFunction => {
    return () => step(ctx, next)
  }, noop)()

const buildImagesPipeline = (...steps: Array<imagesTypes.Step>) => (
  ctx: imagesTypes.Context,
): void =>
  steps.reduceRight((next: NextFunction, step: imagesTypes.Step): NextFunction => {
    return () => step(ctx, next)
  }, noop)()

export { buildImagePipeline, buildImagesPipeline }
