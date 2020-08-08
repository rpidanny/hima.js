// import mktemp, { DirResult } from 'tmp'

import { downloadImages } from '../../src'
// import * as types from '../../src/usecases/download-images/types'

const BATCH_SIZE = 50

describe('Hima images module', () => {
  // describe('Download color images between two dates', () => {
  //   it('should run without fail', async () => {
  //     const tempDir: DirResult = mktemp.dirSync({ unsafeCleanup: true })
  //     const response: types.Success = await downloadImages({
  //       startDate: '2019/10/21 05:00:00',
  //       endDate: '2019/10/21 06:00:00',
  //       interval: 30, // 30 minutes
  //       output: tempDir.name,
  //       batchSize: BATCH_SIZE,
  //       zoom: 1,
  //     })
  //     const resp = await tempDir.removeCallback()
  //     expect(response.images.length).toBe(2)
  //     return resp
  //   })
  // })

  describe('Validation Tests', () => {
    it('should fail when zoom value for infrared image is more than 3', async () => {
      try {
        await downloadImages({
          zoom: 4,
          batchSize: BATCH_SIZE,
          infrared: true,
          startDate: '2019/10/21 05:00:00',
          endDate: '2019/10/21 06:00:00',
          interval: 30, // 30 minutes
        })
      } catch (err) {
        expect(err.message).toBe('"zoom" must be one of [1, 2, 3]')
      }
    })

    it('should fail when zoom value for color image is more than 5', async () => {
      try {
        await downloadImages({
          zoom: 6,
          batchSize: BATCH_SIZE,
          infrared: false,
          startDate: '2019/10/21 05:00:00',
          endDate: '2019/10/21 06:00:00',
          interval: 30, // 30 minutes
        })
      } catch (err) {
        expect(err.message).toBe('"zoom" must be one of [1, 2, 3, 4, 5]')
      }
    })

    it('should fail when interval is less than 10', async () => {
      try {
        await downloadImages({
          zoom: 1,
          batchSize: BATCH_SIZE,
          infrared: false,
          startDate: '2019/10/21 05:00:00',
          endDate: '2019/10/21 06:00:00',
          interval: 3, // 3 minutes
        })
      } catch (err) {
        expect(err.message).toBe('"interval" must be larger than or equal to 10')
      }
    })
  })
})
