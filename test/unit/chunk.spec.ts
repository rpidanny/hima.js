import chunk, { computeBatchConfig } from '../../src/utils/chunk'

describe('Utils: Chunk', () => {
  it('should chunk array into smaller chunks', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const chunks = chunk(arr, 2)

    expect(chunks.length).toBe(6)
    expect(chunks[0].length).toBe(2)
    expect(chunks[5].length).toBe(1)
  })

  it('should return proper batch config when bs > tile count', () => {
    const batchConfig = computeBatchConfig(50, 2)

    expect(batchConfig.image).toBe(16)
    expect(batchConfig.images).toBe(3)
  })

  it('should return proper batch config when bs < tile count', () => {
    const batchConfig = computeBatchConfig(5, 2)
    console.log(batchConfig)
    expect(batchConfig.image).toBe(5)
    expect(batchConfig.images).toBe(1)
  })
})
