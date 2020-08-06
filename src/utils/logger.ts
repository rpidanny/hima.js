import color from 'colors'

import * as types from '../types'

export const getLogger = (debug: boolean): types.LogFunction => {
  const enable = debug
  return (...msgs: Array<string>) => {
    if (enable) {
      const messages = msgs
      const timeString = new Date().toLocaleTimeString()
      messages.unshift(color.green.inverse('[hima]') + ' ' + color.inverse(timeString) + ' ')
      console.log(...messages)
    }
  }
}
