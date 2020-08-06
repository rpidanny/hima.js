import * as types from '../types'

export default (arr: Array<types.Tile>, size: number): Array<Array<types.Tile>> =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  )
