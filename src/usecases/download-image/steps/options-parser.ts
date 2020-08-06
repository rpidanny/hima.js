import { parseDate } from '../../../utils/dates'
import { Context } from '../types'
import { NextFunction } from '../../../types'
import { getImageTypeString, zoomLevelMapper } from '../../../utils/mappers'
import { getLogger } from '../../../utils/logger'

export default async (ctx: Context, next: NextFunction): Promise<void> => {
  const { options } = ctx

  if (options) {
    const { date, infrared, zoom, debug } = options

    if (infrared !== undefined && zoom !== undefined && date !== undefined && debug !== undefined) {
      const imageType: string = getImageTypeString(infrared)
      const level: string = zoomLevelMapper(imageType, zoom)

      ctx.options = {
        ...options,
        imageType,
        level,
        log: getLogger(debug),
      }

      const date: Date = await parseDate(ctx.options)
      ctx.options.now = date

      await next()
    } else {
      throw new Error('Invalid Input')
    }
  }
}
