import fs from 'fs-extra'
import mktemp, { DirResult } from 'tmp'

import { downloadImage, downloadImages } from '../src'
import * as imageTypes from '../src/usecases/download-image/types'
import * as imagesTypes from '../src/usecases/download-images/types'

const BATCH_SIZE = 5

describe('Hima module', () => {
  describe('Download color image of zoom 2', () => {
    it('Should run without fail', async () => {
      const response: imageTypes.Success = await downloadImage({
        zoom: 2,
        batchSize: BATCH_SIZE,
        date: new Date(1581638400000),
      })
      await fs.remove(response.output)
      return response
    })
  })

  describe('Download infra-red images of zoom 2', () => {
    it('Should run without fail', async () => {
      const response: imageTypes.Success = await downloadImage({
        zoom: 2,
        batchSize: BATCH_SIZE,
        infrared: true,
        date: new Date(1581638400000),
      })
      await fs.remove(response.output)
      return response
    })
  })

  describe('Download color images between two dates', () => {
    it('should run without fail', async () => {
      const tempDir: DirResult = mktemp.dirSync({ unsafeCleanup: true })
      const response: imagesTypes.Success = await downloadImages({
        startDate: '2020/02/14 05:00:00',
        endDate: '2020/02/14 06:00:00',
        interval: 30, // 30 minutes
        output: tempDir.name,
        zoom: 1,
      })
      const resp = await tempDir.removeCallback()
      expect(response.images.length).toBe(2)
      return resp
    })
  })
})
