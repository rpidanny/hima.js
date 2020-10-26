import path from 'path'
import nock from 'nock'
import fs from 'fs-extra'
import mktemp, { DirResult } from 'tmp'

import config from '../../src/config'
import { downloadImages } from '../../src'
import * as types from '../../src/usecases/download-images/types'

const BATCH_SIZE = 5

describe('Hima images module', () => {
  let image: Buffer

  beforeAll(() => {
    image = fs.readFileSync(path.join(__dirname, '../assets/img.jpg'))
  })

  beforeEach(async () => {
    nock.abortPendingRequests()
    nock.cleanAll()
    nock.disableNetConnect()
  })

  afterEach(() => {
    const pending = nock.pendingMocks()

    if (pending.length > 0) {
      console.log('Pending Nocks: ', pending)
      throw new Error(`${pending.length} mocks are pending!`)
    }

    nock.enableNetConnect()
  })

  describe('Download color images between two dates', () => {
    it('should run without fail', async () => {
      nock(config.baseUrl).get(/.*/).times(2).reply(200, image, {
        'Content-Type': 'image/jpg',
      })

      const tempDir: DirResult = mktemp.dirSync({ unsafeCleanup: true })
      const response: types.Success = await downloadImages({
        startDate: '2020/02/14 05:00:00',
        endDate: '2020/02/14 06:00:00',
        interval: 30, // 30 minutes
        output: tempDir.name,
        batchSize: BATCH_SIZE,
        debug: false,
        zoom: 1,
      })
      const resp = await tempDir.removeCallback()
      expect(response.images.length).toBe(2)
      return resp
    })
  })

  describe('Validation Tests', () => {
    it('should fail when zoom value for infrared image is more than 3', async () => {
      try {
        await downloadImages({
          zoom: 4,
          batchSize: BATCH_SIZE,
          infrared: true,
          startDate: '2020/02/14 05:00:00',
          endDate: '2020/02/14 06:00:00',
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
          startDate: '2020/02/14 05:00:00',
          endDate: '2020/02/14 06:00:00',
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
          startDate: '2020/02/14 05:00:00',
          endDate: '2020/02/14 06:00:00',
          interval: 3, // 3 minutes
        })
      } catch (err) {
        expect(err.message).toBe('"interval" must be larger than or equal to 10')
      }
    })
  })
})
