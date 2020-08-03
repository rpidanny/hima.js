import got, { Response } from 'got'

import * as types from '../types'
import config from '../config'

const getLatestDate = async (imageType: string): Promise<Date> => {
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
    console.error(err)
    console.log('Failed to get latest date. Setting it to new Date()')
    return new Date()
  }
}

const parseDate = async (options: types.ParsedOptions): Promise<Date> => {
  const { date, imageType } = options
  if (typeof date === 'string' || typeof date === 'number') {
    if (date === 'latest' && imageType) {
      return await getLatestDate(imageType)
    } else {
      return new Date(date)
    }
  } else {
    return date || new Date()
  }
}

export { parseDate }
