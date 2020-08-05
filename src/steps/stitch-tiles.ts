import path from 'path'
import gm from 'gm'
import { promisify } from 'util'

import config from '../config'
import * as types from '../types'

export default async (ctx: types.Context, next: types.NextFunction): Promise<void> => {
  const { options } = ctx
  if (options) {
    const { tiles, tempDir, output, zoom, log } = options
    const { tileWidth } = config

    if (tiles && tempDir && zoom && output && log) {
      const magick = gm(zoom * tileWidth, zoom * tileWidth)
      // Define pages and their respective files
      for (let i = 0; i < tiles.length; i++) {
        const page: types.Tile = tiles[i]
        const coords = '+' + page.x * tileWidth + '+' + page.y * tileWidth
        magick.in('-page', coords).in(path.join(tempDir.name, page.name))
      }

      // Stitch together and write to output directory
      const mosaicWriter = promisify(magick.mosaic().write).bind(magick)
      log('Stitching images together...')
      await mosaicWriter(output)
      // Clean
      log('Cleaning temp files...')
      tempDir.removeCallback()
      log('File saved to ' + output)

      // magick.mosaic().write(output, function (err) {
      //   if (err) {
      //     throw err
      //   }

      // })
      ctx.output = { output }
      await next()
    }
  }
}
