import fs from 'fs'
import stream from 'stream'
import got from 'got'
import { promisify } from 'util'
import asyncRetry from 'async-retry'
import HttpAgent, { HttpsAgent } from 'agentkeepalive'

import { zoomLevelMapper, getImageTypeString, zoomToTilesCountMapping } from './mappers'
import { Tile } from '../../usecases/download-image/types'
import { Timeout, LogFunction } from '../../types'

const pipeline = promisify(stream.pipeline)

const gotInstange = got.extend({
  agent: {
    http: new HttpAgent({
      keepAlive: true,
      maxSockets: 50,
      maxFreeSockets: 10,
      timeout: 60000, // active socket keepalive for 60 seconds
      freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
    }),
    https: new HttpsAgent({
      keepAlive: true,
      maxSockets: 50,
      maxFreeSockets: 10,
      timeout: 60000, // active socket keepalive for 60 seconds
      freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
    }),
  },
})

export const downloadTile = async (
  tile: Tile,
  outputPath: string,
  timeout: Timeout,
  log: LogFunction,
): Promise<void> => {
  const file = `${outputPath}/${tile.name}`

  log(`Downloading tile: ${tile.url}`)

  try {
    await asyncRetry(
      async () => {
        const stream = fs.createWriteStream(file)
        await pipeline(
          gotInstange.stream(tile.url, {
            timeout,
            retry: 0,
            headers: {
              Connection: 'keep-alive',
            },
          }),
          stream,
        )
      },
      {
        onRetry: (err, attempt: number) => {
          if (!log) {
            return
          }
          log(`#${attempt} Retrying to download ${tile.url} -- ${err.message}`)
        },
        retries: 2,
        minTimeout: 1000,
        maxTimeout: 10000,
      },
    )
    log(`Downloading tile: ${tile.url} Complete`)
  } catch (err) {
    if (!log) {
      throw err
    }
    log(`Failed to download ${tile.url}`)
    throw err
  }
}

export { zoomLevelMapper, getImageTypeString, zoomToTilesCountMapping }
