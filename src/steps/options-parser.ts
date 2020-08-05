import { parseDate } from '../utils/dates'
import * as types from '../types'
import { getImageTypeString, zoomLevelMapper } from '../utils/mappers'

export default async (ctx: types.Context, next: types.NextFunction): Promise<void> => {
  const { options } = ctx

  if (options) {
    const { date, infrared, zoom } = options

    if (infrared !== undefined && zoom !== undefined && date !== undefined) {
      const imageType: string = getImageTypeString(infrared)
      const level: string = zoomLevelMapper(imageType, zoom)

      ctx.options = {
        ...options,
        imageType,
        level,
      }

      const date: Date = await parseDate(ctx.options)
      ctx.options.now = date

      await next()
    } else {
      console.log('Invalid Input')
    }
  }
}
