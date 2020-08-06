import config from '../../../config'
import stitchImage from '../../../utils/stitch-image'

import { Context } from '../types'
import { NextFunction } from '../../../types'

export default async (ctx: Context, next: NextFunction): Promise<void> => {
  const { options } = ctx
  if (options) {
    const { tiles, tempDir, output, zoom, log } = options
    const { tileWidth } = config

    if (tiles && tempDir && zoom && output && log) {
      log('Stitching images together...')
      await stitchImage(tiles, tempDir, output, tileWidth, zoom)
      // Clean
      log('Cleaning temp files...')
      tempDir.removeCallback()
      log('File saved to ' + output)

      ctx.output = { output }
      await next()
    }
  }
}
