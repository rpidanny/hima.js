import fs from 'fs-extra'

import { downloadImage } from '../../src'
import * as types from '../../src/usecases/download-image/types'

const BATCH_SIZE = 5

describe('Hima image module', () => {
  describe('Download color image of zoom 2', () => {
    it('Should run without fail', async () => {
      const response: types.Success = await downloadImage({
        zoom: 2,
        batchSize: BATCH_SIZE,
        date: '2020/01/21 18:30:20Z',
      })
      await fs.remove(response.output)
      return response
    })
  })

  describe('Download infra-red images of zoom 2', () => {
    it('Should run without fail', async () => {
      const response: types.Success = await downloadImage({
        zoom: 2,
        batchSize: BATCH_SIZE,
        infrared: true,
        date: new Date(1581638400000),
      })
      await fs.remove(response.output)
      return response
    })
  })

  describe('Validation Tests', () => {
    it('should fail when zoom value for infrared image is more than 3', async () => {
      try {
        await downloadImage({
          zoom: 4,
          batchSize: BATCH_SIZE,
          infrared: true,
          date: '2019/10/21 18:30:21Z',
        })
      } catch (err) {
        expect(err.message).toBe('"zoom" must be one of [1, 2, 3]')
      }
    })

    it('should fail when zoom value for color image is more than 5', async () => {
      try {
        await downloadImage({
          zoom: 6,
          batchSize: BATCH_SIZE,
          infrared: false,
          date: '2019/10/21 18:30:21Z',
        })
      } catch (err) {
        expect(err.message).toBe('"zoom" must be one of [1, 2, 3, 4, 5]')
      }
    })

    it('should fail when batchSize is less than 1', async () => {
      try {
        await downloadImage({
          zoom: 1,
          batchSize: -1,
          infrared: false,
          date: '2019/10/21 18:30:21Z',
        })
      } catch (err) {
        expect(err.message).toBe('"batchSize" must be larger than or equal to 1')
      }
    })
  })
})
