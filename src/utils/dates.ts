import got, { Response } from 'got'

import { LogFunction } from '../types'
import { Options } from '../usecases/download-image/types'
import config from '../config'

const getLatestDate = async (imageType: string, log: LogFunction): Promise<Date> => {
  const url = `${config.baseUrl}/${imageType}/latest.json`
  try {
    const response: Response<string> = await got(url, {
      method: 'get',
      timeout: 30000,
    })
    if (response && response.body) {
      const date: Date = new Date(JSON.parse(response.body).date)
      return date
    }
    return new Date()
  } catch (err) {
    log(err.message, 'Failed to get latest date. Setting it to new Date().')
    return new Date()
  }
}

const parseDate = async (options: Options): Promise<Date> => {
  const { date, imageType, log } = options
  if (date !== undefined && imageType && log) {
    if (typeof date === 'string' || typeof date === 'number') {
      if (date === 'latest' && imageType) {
        return await getLatestDate(imageType, log)
      } else {
        return new Date(date)
      }
    } else {
      return date || new Date()
    }
  } else {
    throw new Error('Invalid input')
  }
}

const getDates = (
  startDate: Date | string,
  endDate: Date | string,
  interval: number,
): Array<Date> => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const diffMinutes = Math.abs(end.getTime() - start.getTime()) / 60000
  const intervals = diffMinutes / interval

  // Counts and a list
  let minutes = 0
  const dates = []
  for (let i = 0; i < intervals; i++) {
    const date = new Date(startDate)
    date.setMinutes(minutes)
    dates.push(date)
    minutes -= interval
  }
  return dates
}

export { parseDate, getDates }
