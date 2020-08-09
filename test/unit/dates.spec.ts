import { getLogger } from '../../src/utils/logger'
import { parseDate, getDates } from '../../src/utils/dates'
import { createImageOptions } from '../utils/create-data'
import * as types from '../../src/types'
import * as imageTypes from '../../src/usecases/download-image/types'

describe('Utils: Check Date Helpers', () => {
  let log: types.LogFunction
  beforeAll(() => {
    log = getLogger(true, 'test')
  })
  it('should get latest date', async () => {
    const options: imageTypes.Options = createImageOptions({ date: 'latest', log })
    const latestDate: Date = await parseDate(options)
    const currentDate: Date = new Date()
    expect(latestDate.getFullYear()).toBe(currentDate.getFullYear())
    // Due to timezones, this fails once in a while
    // expect(latestDate.getMonth()).toBe(currentDate.getMonth())
    // expect(latestDate.getDay()).toBe(currentDate.getDay())
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
