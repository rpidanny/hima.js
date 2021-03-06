import mktmp, { DirResult } from 'tmp'
import nock from 'nock'

import { getLogger } from '../../src/utils/logger'
import { downloadTile } from '../../src/externals/himawari'
import * as types from '../../src/types'
import * as imageTypes from '../../src/usecases/download-image/types'

describe('Externals: Himawari', () => {
  let log: types.LogFunction

  beforeAll(() => {
    log = getLogger(false, 'test')
  })

  beforeEach(() => {
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

  describe('retries', () => {
    it('should retry 5 times', async () => {
      const tile: imageTypes.Tile = {
        name: 'test.jpg',
        x: 0,
        y: 0,
        url: 'http://himawari.com/test.jpg',
      }
      const timeout: types.Timeout = {
        connect: 10,
        request: 20,
        response: 30,
      }
      const tmpDir: DirResult = mktmp.dirSync({ unsafeCleanup: true })
      nock('http://himawari.com')
        .get('/test.jpg')
        .times(2)
        .reply(500)
        .get('/test.jpg')
        .delayConnection(5)
        .reply(200, 'response body')
      await downloadTile(tile, tmpDir.name, timeout, log)
      tmpDir.removeCallback()
    })

    it('should fail after 5 retry attempts', async () => {
      const tile: imageTypes.Tile = {
        name: 'test.jpg',
        x: 0,
        y: 0,
        url: 'http://himawari.com/test.jpg',
      }
      const timeout: types.Timeout = {
        connect: 10,
        request: 20,
        response: 30,
      }
      const tmpDir: DirResult = mktmp.dirSync({ unsafeCleanup: true })
      nock('http://himawari.com').get('/test.jpg').times(3).reply(500)
      try {
        await downloadTile(tile, tmpDir.name, timeout, log)
      } catch (err) {
        expect(err.message).toBe('Response code 500 (Internal Server Error)')
      }
      tmpDir.removeCallback()
    })
  })
})
