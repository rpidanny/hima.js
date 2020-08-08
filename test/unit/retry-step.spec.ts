import nock from 'nock'

import { buildImagePipeline } from '../../src/utils/build-pipeline'
import retryHandler from '../../src/usecases/download-image/steps/retry-handler'
import { createMockHttpImageStep } from '../utils/create-steps'
import * as types from '../../src/usecases/download-image/types'

describe('Retry Handler', () => {
  const ctx: types.Context = {
    rawOptions: {},
    options: {},
  }
  const baseUrl = 'http://himawari.com'
  const urlPath = '/test.jpg'
  const responseBody = 'Taju Kage Bunshin no Jutsu'
  const executor = buildImagePipeline(retryHandler, createMockHttpImageStep(`${baseUrl}${urlPath}`))

  afterEach(() => {
    nock.cleanAll()
  })

  it('should retry twice', async () => {
    nock(baseUrl).get(urlPath).reply(500).get(urlPath).delayConnection(5).reply(200, responseBody)
    await executor(ctx)

    if (ctx.output) {
      expect(ctx.output.output).toBe(responseBody)
    } else {
      throw new Error('Did not receive any output')
    }
  })

  it('should fail after 2 retries', async () => {
    nock(baseUrl).get(urlPath).times(3).reply(500)
    try {
      await executor(ctx)
    } catch (err) {
      expect(err.message).toBe('Response code 500 (Internal Server Error)')
    }
  })
})
