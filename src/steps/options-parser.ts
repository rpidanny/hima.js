import { parseDate } from '../utils/dates'
import * as types from '../types'
import { getImageTypeString, zoomLevelMapper } from '../utils/mappers'

const getLogger = (debug: boolean): types.LogFunction => {
  const enable = debug
  return (...msgs: Array<string>) => {
    if (enable) {
      const messages = msgs
      messages.unshift('[hima]')
      console.log(...messages)
    }
  }
}

export default async (ctx: types.Context, next: types.NextFunction): Promise<void> => {
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
