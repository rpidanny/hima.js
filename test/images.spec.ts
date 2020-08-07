import mktemp, { DirResult } from 'tmp'

import { downloadImages } from '../src'
import * as types from '../src/usecases/download-images/types'

const BATCH_SIZE = 5

describe('Hima images module', () => {
  describe('Download color images between two dates', () => {
    it('should run without fail', async () => {
      const tempDir: DirResult = mktemp.dirSync({ unsafeCleanup: true })
      const response: types.Success = await downloadImages({
        startDate: '2019/10/21 05:00:00',
        endDate: '2019/10/21 06:00:00',
        interval: 30, // 30 minutes
        output: tempDir.name,
        batchSize: BATCH_SIZE,
        zoom: 1,
      })
      const resp = await tempDir.removeCallback()
      expect(response.images.length).toBe(2)
      return resp
    })
  })
})
