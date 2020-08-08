import { Context } from '../types'
import { NextFunction } from '../../../types'
import { stitchImagesFromDir } from '../../../utils/video'

export default async (ctx: Context, next: NextFunction): Promise<void> => {
  const { options } = ctx

  if (options) {
    const { images, quality, output, fps } = options

    if (quality !== undefined && images && output && fps) {
      await stitchImagesFromDir(images.rootDir, quality, fps, output)
      ctx.output = {
        output,
      }
      await next()
    } else {
      throw new Error('Invalid Input')
    }
  } else {
    throw new Error('Invalid Input')
  }
}
