import chunk from '../../src/utils/chunk'

describe('Utils: Chunk', () => {
  it('should chunk array into smaller chunks', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const chunks = chunk(arr, 2)

    expect(chunks.length).toBe(6)
    expect(chunks[0].length).toBe(2)
    expect(chunks[5].length).toBe(1)
  })
})
