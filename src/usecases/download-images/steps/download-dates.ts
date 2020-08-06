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
      for (let i = 0; i < dates.length; i++) {
        const response: imageTypes.Success = await downloadImage({
          date: dates[i],
          timeout,
          infrared,
          batchSize,
          debug,
          zoom,
          output: path.resolve(output, `${dates[i].toUTCString()}.jpg`),
        })
        if (progress) {
          progress(i + 1, dates.length)
        }
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
