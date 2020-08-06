import { Tile } from '../usecases/download-image/types'

export default (arr: Array<Tile>, size: number): Array<Array<Tile>> =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  )
