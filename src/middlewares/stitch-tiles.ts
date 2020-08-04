import path from 'path'
import gm from 'gm'
import { promisify } from 'util'

import config from '../config'
import * as types from '../types'

export default async (ctx: types.Context, next: types.NextFunction): Promise<void> => {
  const { parsedOptions } = ctx
  if (parsedOptions) {
    const { tiles, tempDir, output, zoom } = parsedOptions
    const { tileWidth } = config

    if (tiles && tempDir && zoom && output) {
      const magick = gm(zoom * tileWidth, zoom * tileWidth)
      // Define pages and their respective files
      for (let i = 0; i < tiles.length; i++) {
        const page: types.Tile = tiles[i]
        const coords = '+' + page.x * tileWidth + '+' + page.y * tileWidth
        magick.in('-page', coords).in(path.join(tempDir.name, page.name))
      }

      // Stitch together and write to output directory
      const mosaicWriter = promisify(magick.mosaic().write).bind(magick)
      console.log('Stitching images together...')
      await mosaicWriter(output)
      // Clean
      console.log('Cleaning temp files...')
      tempDir.removeCallback()
      console.log('File saved to ' + output)

      // magick.mosaic().write(output, function (err) {
      //   if (err) {
      //     throw err
      //   }

      // })
      ctx.output = {
        status: 'Success',
        data: {
          output,
        },
      }
      await next()
    }
  }
}
