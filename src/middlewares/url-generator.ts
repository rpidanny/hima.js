import moment from 'moment'

import config from '../config'
import * as types from '../types'

export default async (ctx: types.Context, next: types.NextFunction): Promise<void> => {
  const { parsedOptions } = ctx
  const width = 550
  console.log('Parsed Options: ', parsedOptions)

  if (parsedOptions) {
    const { level, now } = parsedOptions

    if (level !== undefined && now !== undefined) {
      const blocks: number = parseInt(level.replace(/[a-zA-Z]/g, ''), 10)

      // Normalize our date
      now.setMinutes(now.getMinutes() - (now.getMinutes() % 10))
      now.setSeconds(0)

      // Format our url paths
      const time = moment(now).format('HHmmss')
      const year = moment(now).format('YYYY')
      const month = moment(now).format('MM')
      const day = moment(now).format('DD')

      const urlPrefix = [config.baseUrl, level, width, year, month, day, time].join('/')

      // Compose our requests
      const tiles: Array<types.Tile> = []
      for (let x = 0; x < blocks; x++) {
        for (let y = 0; y < blocks; y++) {
          tiles.push({
            name: `${x}_${y}.png`,
            x: x,
            y: y,
            url: `${urlPrefix}_${x}_${y}.png`,
          })
        }
      }

      ctx.parsedOptions = {
        ...parsedOptions,
        tiles,
      }
      await next()
    }
  }
}
