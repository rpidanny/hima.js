import fs from 'fs-extra'

import { downloadImage } from '../src'
import * as types from '../src/usecases/download-image/types'

const BATCH_SIZE = 5

describe('Hima module', () => {
  describe('Download color image of zoom 1', () => {
    it('should run without fail', async () => {
      const response: types.Success = await downloadImage({
        zoom: 1,
      })
      await fs.remove(response.output)
      return response
    })
  })

  describe('Download color image of zoom 2', () => {
    it('Should run without fail', async () => {
      const response: types.Success = await downloadImage({
        zoom: 2,
        batchSize: BATCH_SIZE,
        date: new Date(1581638400000),
      })
      await fs.remove(response.output)
      return response
    })
  })

  describe('Download infra-red images of zoom 1', () => {
    it('Should run without fail', async () => {
      const response: types.Success = await downloadImage({
        zoom: 1,
        infrared: true,
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
})
