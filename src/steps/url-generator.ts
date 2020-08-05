import moment from 'moment'

import config from '../config'
import * as types from '../types'

export default async (ctx: types.Context, next: types.NextFunction): Promise<void> => {
  const { options } = ctx
  const width = 550

  if (options) {
    const { level, now, imageType, output } = options

    if (level !== undefined && now !== undefined && imageType) {
      const blocks: number = parseInt(level.replace(/[a-zA-Z]/g, ''), 10)

      // Normalize our date
      now.setMinutes(now.getMinutes() - (now.getMinutes() % 10))
      now.setSeconds(0)

      // Format our url paths
      const time = moment(now).format('HHmmss')
      const year = moment(now).format('YYYY')
      const month = moment(now).format('MM')
      const day = moment(now).format('DD')

      const urlPrefix = [config.baseUrl, imageType, level, width, year, month, day, time].join('/')
      const outfile = output || './' + [year, month, day, '_', time, '.jpg'].join('')

      // Compose our requests
      const tiles: Array<types.Tile> = []
      for (let x = 0; x < blocks; x++) {
        for (let y = 0; y < blocks; y++) {
          tiles.push({
            url: `${urlPrefix}_${x}_${y}.png`,
            name: `${x}_${y}.png`,
            x: x,
            y: y,
          })
        }
      }

      ctx.options = {
        ...options,
        tiles,
        output: outfile,
      }
      console.time(`Downloaded ${tiles.length} tiles in `)
      console.log(`Downloading ${tiles.length} tiles:`)
      await next()
      console.timeEnd(`Downloaded ${tiles.length} tiles in `)
    }
  }
}
