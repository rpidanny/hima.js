import path from 'path'
import { downloadImage } from '../../download-image'
import { Context } from '../types'
import { NextFunction } from '../../../types'
import * as imageTypes from '../../download-image/types'

export default async (ctx: Context, next: NextFunction): Promise<void> => {
  const { options } = ctx
  if (options) {
    const { dates, timeout, infrared, batchSize, debug, zoom, output, progress } = options

    if (dates && output) {
      const responses: Array<imageTypes.Success> = []
      let totalProgress = 0
      for (let i = 0; i < dates.length; i++) {
        const response: imageTypes.Success = await downloadImage({
          date: dates[i],
          timeout,
          infrared,
          batchSize,
          debug,
          zoom,
          output: path.resolve(output, `${dates[i].toISOString()}.jpg`),
          progress: (c, t) => {
            if (progress) {
              const percentComplete = (c / t) * 100
              if (percentComplete === 100) {
                totalProgress += 100
                progress(totalProgress, dates.length * 100)
              } else {
                progress(totalProgress + percentComplete, dates.length * 100)
              }
            }
          },
        })
        responses.push(response)
      }

      ctx.output = {
        images: responses,
      }

      await next()
    } else {
      throw new Error('No dates to download.')
    }
  } else {
    throw new Error('No options')
  }
}
