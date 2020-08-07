import mkTmp, { DirResult } from 'tmp'

import { downloadImages } from '../../download-images'
import { Context } from '../types'
import { NextFunction } from '../../../types'
import { getLogger } from '../../../utils/logger'
import { getZoomFromQuality } from '../../../utils/video'

export default async (ctx: Context, next: NextFunction): Promise<void> => {
  const { options } = ctx

  if (options) {
    const { debug, quality } = options

    if (quality !== undefined && debug !== undefined) {
      const log = getLogger(debug)
      const tempDir: DirResult = mkTmp.dirSync({ unsafeCleanup: true })

      const commonOptions = { ...options }
      delete commonOptions.quality
      const images = await downloadImages({
        ...commonOptions,
        output: tempDir.name,
        zoom: getZoomFromQuality(quality),
      })
      ctx.options = {
        ...options,
        images,
        log,
      }
      await next()
      log('Cleaning temp dir')
      tempDir.removeCallback()
    } else {
      throw new Error('Invalid Input')
    }
  }
}
