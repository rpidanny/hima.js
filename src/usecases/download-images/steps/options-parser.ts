import { getDates } from '../../../utils/dates'
import { Context } from '../types'
import { NextFunction } from '../../../types'
import { getLogger } from '../../../utils/logger'

export default async (ctx: Context, next: NextFunction): Promise<void> => {
  const { options } = ctx

  if (options) {
    const { startDate, endDate, interval, debug } = options

    if (
      startDate !== undefined &&
      endDate !== undefined &&
      interval !== undefined &&
      debug !== undefined
    ) {
      const dates = getDates(startDate, endDate, interval)
      ctx.options = {
        ...options,
        dates,
        log: getLogger(debug),
      }
      console.log(ctx.options)
      await next()
    } else {
      throw new Error('Invalid Input')
    }
  }
}
