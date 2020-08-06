import fs from 'fs'
import stream from 'stream'
import got from 'got'
import { promisify } from 'util'

import * as types from '../usecases/download-image/types'

const pipeline = promisify(stream.pipeline)

export const downloadTile = async (
  tile: types.Tile,
  outputPath: string,
  timeout: types.Timeout,
): Promise<void> => {
  const file = `${outputPath}/${tile.name}`
  const stream = fs.createWriteStream(file)

  try {
    return await pipeline(
      got.stream(tile.url, {
        timeout,
        retry: 4,
        headers: {
          Connection: 'keep-alive',
        },
      }),
      stream,
    )
  } catch (err) {
    console.error(`Failed to download ${tile.url}`)
    throw err
  }
}
