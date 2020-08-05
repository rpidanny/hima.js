import fs from 'fs'
import stream from 'stream'
import mktemp, { DirResult } from 'tmp'
import { promisify } from 'util'

import * as types from '../types'
import got from 'got/dist/source'

const pipeline = promisify(stream.pipeline)

const downloadBatch = (
  tiles: Array<types.Tile>,
  timeout: number,
  outputPath: string,
): Promise<void[]> =>
  Promise.all(
    tiles.map(async (tile: types.Tile) => {
      const file = `${outputPath}/${tile.name}`
      const stream = fs.createWriteStream(file)

      try {
        return await pipeline(
          got.stream(tile.url, {
            timeout,
            retry: 4,
          }),
          stream,
        )
      } catch (err) {
        console.error(`Failed to download ${tile.url}`)
        throw err
      }
    }),
  )

export default async (ctx: types.Context, next: types.NextFunction): Promise<void> => {
  const { options } = ctx

  if (options) {
    const { tiles, timeout, output } = options
    if (tiles && timeout && output) {
      const tempDir: DirResult = mktemp.dirSync({ unsafeCleanup: true })

      if (tempDir && tempDir.name) {
        await downloadBatch(tiles, timeout, tempDir.name)

        ctx.options = {
          ...options,
          tempDir,
        }
        await next()
      }
    }
  }
}
