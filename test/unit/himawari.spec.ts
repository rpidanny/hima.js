import mktmp, { DirResult } from 'tmp'
import nock from 'nock'

import { getLogger } from '../../src/utils/logger'
import { downloadTile } from '../../src/externals/himawari'
import * as types from '../../src/types'
import * as imageTypes from '../../src/usecases/download-image/types'

describe('Externals: Himawari', () => {
  let log: types.LogFunction
  beforeAll(() => {
    log = getLogger(true)
  })

  afterEach(() => {
    nock.cleanAll()
  })

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
      .times(4)
      .reply(500)
      .get('/test.jpg')
      .delayConnection(5)
      .reply(200, 'response body')
    await downloadTile(tile, tmpDir.name, timeout, log)
    tmpDir.removeCallback()
  })
})
