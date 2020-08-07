import mktemp, { DirResult } from 'tmp'

import { Tile, Context } from '../types'
import { Timeout, LogFunction, ProgressFunction, NextFunction } from '../../../types'
import chunk from '../../../utils/chunk'
import { downloadTile } from '../../../externals/himawari'

const downloadBatch = async (
  tiles: Array<Tile>,
  timeout: Timeout,
  batchSize: number,
  outputPath: string,
  log: LogFunction,
  progress: ProgressFunction | undefined,
): Promise<void[]> => {
  const miniBatches = chunk(tiles, batchSize)
  const finalResponse: Array<void> = []
  const totalTiles = tiles.length
  let completedTiles = 0

  for (let i = 0; i < miniBatches.length; i++) {
    log(`Downloading batch ${i}/${miniBatches.length - 1} of size ${miniBatches[i].length}`)
    const response: Array<void> = await Promise.all(
      miniBatches[i].map(
        async (tile: Tile): Promise<void> => await downloadTile(tile, outputPath, timeout, log),
      ),
    )
    finalResponse.concat(response)
    if (progress) {
      completedTiles += miniBatches[i].length
      progress(completedTiles, totalTiles)
    }
  }
  return finalResponse
}

export default async (ctx: Context, next: NextFunction): Promise<void> => {
  const { options } = ctx

  if (options) {
    const { tiles, timeout, output, batchSize, log, progress } = options
    if (tiles && timeout && output && batchSize && log) {
      const tempDir: DirResult = mktemp.dirSync({ unsafeCleanup: true })

      if (tempDir && tempDir.name) {
        await downloadBatch(tiles, timeout, batchSize, tempDir.name, log, progress)

        ctx.options = {
          ...options,
          tempDir,
        }
        await next()
      }
    }
  }
}
