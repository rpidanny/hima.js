import { parseDate } from '../utils/dates'
import * as types from '../types'
import { getImageTypeString, zoomLevelMapper } from '../utils/mappers'

export default async (ctx: types.Context, next: types.NextFunction): Promise<void> => {
  const { validatedOptions } = ctx

  if (validatedOptions) {
    const { date, infrared, zoom } = validatedOptions

    if (infrared !== undefined && zoom !== undefined && date !== undefined) {
      const imageType: string = getImageTypeString(infrared)
      const level: string = zoomLevelMapper(imageType, zoom)

      ctx.parsedOptions = {
        ...validatedOptions,
        imageType,
        level,
      }

      const date: Date = await parseDate(ctx.parsedOptions)
      ctx.parsedOptions.now = date

      await next()
    } else {
      console.log('Invalid Input')
    }
  }
}
