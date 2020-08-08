import fs from 'fs-extra'
import mkTmp, { DirResult } from 'tmp'
import { promisify } from 'util'

import { downloadImages } from '../../download-images'
import { Context } from '../types'
import { NextFunction } from '../../../types'
import { getLogger } from '../../../utils/logger'
import { getZoomFromQuality } from '../../../utils/video'

const pathExists = promisify(fs.pathExists)

export default async (ctx: Context, next: NextFunction): Promise<void> => {
  const { options } = ctx

  if (options) {
    const { debug, quality, output } = options

    if (quality !== undefined && debug !== undefined && output) {
      const log = getLogger(debug)

      if (await pathExists(output)) {
        throw new Error(`${output} already exists.`)
      }

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
