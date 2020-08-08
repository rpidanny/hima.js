import asyncRetry from 'async-retry'

import { Context } from '../types'
import { NextFunction } from '../../../types'

export default async (ctx: Context, next: NextFunction): Promise<void> => {
  const { options } = ctx
  if (options) {
    await asyncRetry(
      async () => {
        await next()
      },
      {
        onRetry: (_err, attempt: number) => {
          if (!options.log) {
            return
          }
          options.log(`#${attempt} Retrying to download the image..`)
        },
        retries: 2,
        minTimeout: 1000,
        maxTimeout: 10000,
      },
    )
  } else {
    throw new Error('Invalid Context')
  }
}
