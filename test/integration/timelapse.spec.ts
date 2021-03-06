import path from 'path'
import nock from 'nock'
import mktemp, { DirResult } from 'tmp'
import fs from 'fs-extra'
import { promisify } from 'util'

import config from '../../src/config'
import { createTimelapse } from '../../src'
import * as types from '../../src/usecases/create-timelapse/types'

const ensureFile = promisify(fs.ensureFile)

const BATCH_SIZE = 1

describe('Hima timelapse module', () => {
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

  it('should create a timelapse video without fail', async () => {
    nock(config.baseUrl).get(/.*/).times(32).reply(200, image, {
      'Content-Type': 'image/jpg',
    })

    const tempDir: DirResult = mktemp.dirSync({ unsafeCleanup: true })
    const output = `${tempDir.name}/timelapse.mp4`
    const response: types.Success = await createTimelapse({
      startDate: '2020/02/14 05:00:00Z',
      endDate: '2020/02/14 06:00:00Z',
      interval: 30,
      quality: '720',
      output,
      debug: false,
      batchSize: BATCH_SIZE,
    })
    tempDir.removeCallback()
    expect(response.output).toBe(output)
  })

  it('should fail when output file already exists', async () => {
    const tempDir: DirResult = mktemp.dirSync({ unsafeCleanup: true })
    const output = `${tempDir.name}/timelapse.mp4`
    await ensureFile(output)
    try {
      await createTimelapse({
        startDate: '2020/02/14 05:00:00Z',
        endDate: '2020/02/14 06:00:00Z',
        interval: 30,
        quality: '720',
        output,
        batchSize: BATCH_SIZE,
      })
    } catch (err) {
      expect(err.message).toBe(`${output} already exists.`)
    }
    tempDir.removeCallback()
  })

  describe('Validation Tests', () => {
    it('should fail when quality is not one of [480, 720, 1080, 1440, 2160]', async () => {
      try {
        await createTimelapse({
          quality: '360',
          batchSize: BATCH_SIZE,
          infrared: true,
          startDate: '2020/02/14 05:00:00',
          endDate: '2020/02/14 06:00:00',
          interval: 30, // 30 minutes
        })
      } catch (err) {
        expect(err.message).toBe('"quality" must be one of [480, 720, 1080, 1440, 2160]')
      }
    })

    it('should fail when interval is less than 10', async () => {
      try {
        await createTimelapse({
          quality: '1080',
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
