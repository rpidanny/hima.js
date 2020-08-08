import mktemp, { DirResult } from 'tmp'
import fs from 'fs-extra'
import { promisify } from 'util'

import { createTimelapse } from '../../src'
import * as types from '../../src/usecases/create-timelapse/types'

const ensureFile = promisify(fs.ensureFile)

const BATCH_SIZE = 100

describe('Hima timelapse module', () => {
  it('should create a timelapse video without fail', async () => {
    const tempDir: DirResult = mktemp.dirSync({ unsafeCleanup: true })
    const output = `${tempDir.name}/timelapse.mp4`
    const response: types.Success = await createTimelapse({
      startDate: '2019/10/21 05:00:00',
      endDate: '2019/10/21 06:00:00',
      interval: 30,
      quality: '720',
      output,
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
        startDate: '2019/10/21 05:00:00',
        endDate: '2019/10/21 06:00:00',
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
})
