import path from 'path'
import hummanizeDuration from 'humanize-duration'

import { downloadImage } from '../../download-image'
import { Context } from '../types'
import { NextFunction } from '../../../types'
import * as imageTypes from '../../download-image/types'
import chunk, { computeBatchConfig } from '../../../utils/chunk'

const batchDownloadDates = (
  dates: Array<imageTypes.RawOptions>,
): Promise<Array<imageTypes.Success>> =>
  Promise.all(
    dates.map((date: imageTypes.RawOptions): Promise<imageTypes.Success> => downloadImage(date)),
  )

export default async (ctx: Context, next: NextFunction): Promise<void> => {
  const { options } = ctx
  if (options) {
    const { dates, timeout, infrared, debug, batchSize, zoom, output, log, progress } = options

    if (dates && output && batchSize && zoom && log) {
      let totalProgress = 0
      let responses: Array<imageTypes.Success> = []
      const batchConfig = computeBatchConfig(batchSize, zoom)

      const dateOptions = dates.map(
        (date): imageTypes.RawOptions => ({
          date,
          timeout,
          infrared,
          batchSize: batchConfig.image,
          debug,
          zoom,
          output: path.resolve(output, `${date.toISOString()}.jpg`),
          progress: (c: number, t: number) => {
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
        }),
      )

      const chunks = chunk(dateOptions, batchConfig.images)

      log(`BatchConfig: image=${batchConfig.image}, images=${batchConfig.images}`)

      const startTime = new Date().getTime()
      log(`Downloading ${dates.length} image(s)`)
      for (let i = 0; i < chunks.length; i++) {
        log(
          `Downloading Images chunk ${i + 1}/${chunks.length} of size ${chunks[i].length} images..`,
        )
        const response: Array<imageTypes.Success> = await batchDownloadDates(chunks[i])
        responses = responses.concat(response)
        log(`Downloaded Images chunk ${i + 1}/${chunks.length}`)
      }

      const elapsedTime = new Date().getTime() - startTime
      log(`Downloaded ${dates.length} image of zoom ${zoom} in ${hummanizeDuration(elapsedTime)}`)

      ctx.output = {
        rootDir: path.resolve(output),
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
