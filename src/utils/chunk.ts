import { BatchConfig } from '../usecases/download-images/types'
import { zoomToTilesCountMapping } from '../externals/himawari'

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default (arr: Array<any>, size: number): Array<Array<any>> =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  )

export const computeBatchConfig = (batchSize: number, zoom: number): BatchConfig => {
  const tilesCount = zoomToTilesCountMapping[zoom]
  return {
    image: batchSize <= tilesCount ? batchSize : tilesCount,
    images: batchSize <= tilesCount ? 1 : Number((batchSize / tilesCount).toFixed(0)),
  }
}
