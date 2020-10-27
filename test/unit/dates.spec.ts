import nock from 'nock'

import { getLogger } from '../../src/utils/logger'
import { parseDate, getDates } from '../../src/utils/dates'
import { createImageOptions } from '../utils/create-data'
import * as types from '../../src/types'
import * as imageTypes from '../../src/usecases/download-image/types'
import config from '../../src/config'

describe('Utils: Check Date Helpers', () => {
  let log: types.LogFunction

  beforeAll(() => {
    log = getLogger(true, 'test')
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

  it('should get latest date', async () => {
    const currentDate: Date = new Date()

    nock(config.baseUrl)
      .get('/D531106/latest.json')
      .reply(
        200,
        JSON.stringify({
          date: currentDate.toISOString(),
          file: 'PI_H08_20201027_1650_TRC_FLDK_R10_PGPFD.png',
        }),
      )

    const options: imageTypes.Options = createImageOptions({ date: 'latest', log })
    const latestDate: Date = await parseDate(options)

    expect(latestDate.getFullYear()).toBe(currentDate.getFullYear())
    expect(latestDate.getMonth()).toBe(currentDate.getMonth())
    expect(latestDate.getDay()).toBe(currentDate.getDay())
  })
  it('should parse date string correctly', async () => {
    const options: imageTypes.Options = createImageOptions({ date: '2019/10/21 18:30:21Z', log })
    const parsedDate: Date = await parseDate(options)
    expect(parsedDate.toISOString()).toBe('2019-10-21T18:30:21.000Z')
  })

  it('should get dates between start and end', async () => {
    const startDate = '2019/10/21 18:30:21Z'
    const endDate = '2019/10/21 20:30:21Z'
    const interval = 30 // minutes
    const dates: Array<Date> = getDates(startDate, endDate, interval)

    expect(dates.length).toBe(4)
    expect(dates[0].toISOString()).toBe('2019-10-21T20:00:21.000Z')
    expect(dates[1].toISOString()).toBe('2019-10-21T19:30:21.000Z')
    expect(dates[2].toISOString()).toBe('2019-10-21T19:00:21.000Z')
    expect(dates[3].toISOString()).toBe('2019-10-21T18:30:21.000Z')
  })
})
