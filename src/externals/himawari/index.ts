import fs from 'fs'
import stream from 'stream'
import got from 'got'
import { promisify } from 'util'
import asyncRetry from 'async-retry'

import { zoomLevelMapper, getImageTypeString } from './mappers'
import { Tile } from '../../usecases/download-image/types'
import { Timeout, LogFunction } from '../../types'

const pipeline = promisify(stream.pipeline)

export const downloadTile = async (
  tile: Tile,
  outputPath: string,
  timeout: Timeout,
  log: LogFunction,
): Promise<void> => {
  const file = `${outputPath}/${tile.name}`

  try {
    return await asyncRetry(
      async () => {
        const stream = fs.createWriteStream(file)
        await pipeline(
          got.stream(tile.url, {
            timeout,
            retry: 4,
            headers: {
              Connection: 'keep-alive',
            },
          }),
          stream,
        )
      },
      {
        onRetry: (_err, attempt: number) => {
          if (!log) {
            return
          }
          log(`#${attempt} Retrying to download ${tile.url} ...`)
        },
        retries: 5,
        minTimeout: 1000,
        maxTimeout: 10000,
      },
    )
  } catch (err) {
    if (!log) {
      throw err
    }
    log(`Failed to download ${tile.url}`)
    throw err
  }
}

export { zoomLevelMapper, getImageTypeString }
