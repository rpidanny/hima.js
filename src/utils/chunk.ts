export default (arr: Array<any>, size: number): Array<Array<any>> =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  )
