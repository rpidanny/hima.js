import path from 'path'
import gm from 'gm'
import { DirResult } from 'tmp'
import { promisify } from 'util'

import { Tile } from '../usecases/download-image/types'

export default async (
  tiles: Array<Tile>,
  tilesDir: DirResult,
  output: string,
  width: number,
  zoom: number,
): Promise<void> => {
  const magick = gm(zoom * width, zoom * width)
  // Define pages and their respective files
  for (let i = 0; i < tiles.length; i++) {
    const page: Tile = tiles[i]
    const coords = '+' + page.x * width + '+' + page.y * width
    magick.in('-page', coords).in(path.join(tilesDir.name, page.name))
  }

  // Stitch together and write to output directory
  const mosaicWriter = promisify(magick.mosaic().write).bind(magick)
  await mosaicWriter(output)
}
