import got, { Response } from 'got'

import * as types from '../types'
import config from '../config'

const getLatestDate = async (imageType: string, log: types.LogFunction): Promise<Date> => {
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

const parseDate = async (options: types.Options): Promise<Date> => {
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

export { parseDate }
