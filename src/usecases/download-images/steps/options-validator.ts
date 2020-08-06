import Joi from '@hapi/joi'

import { Context } from '../types'
import { NextFunction } from '../../../types'

const timeoutValidationSchema = Joi.object()
  .keys({
    connect: Joi.number().default(15000),
    response: Joi.number().default(15000),
    request: Joi.number().default(30000),
  })
  .default({
    connect: 15000,
    response: 15000,
    request: 30000,
  })

const optionsValidationSchema = Joi.object()
  .keys({
    startDate: Joi.alternatives().try(Joi.date(), Joi.string()).required(),
    endDate: Joi.alternatives().try(Joi.date(), Joi.string()).required(),
    interval: Joi.number().required(),
    zoom: Joi.number().default(1),
    infrared: Joi.boolean().default(false),
    output: Joi.string().default('./images'),
    batchSize: Joi.number().default(20),
    timeout: timeoutValidationSchema,
    debug: Joi.boolean().default(false),
    progress: Joi.function().optional(),
  })
  .default({
    zoom: 1,
    infrared: false,
    batchSize: 20,
    output: './',
    timeout: {
      connect: 15000,
      response: 15000,
      request: 30000,
    },
    debug: false,
  })

export default async (ctx: Context, next: NextFunction): Promise<void> => {
  const { rawOptions } = ctx
  const { error, value } = await optionsValidationSchema.validate(rawOptions, {
    allowUnknown: false,
  })

  if (error) {
    throw error
  }

  ctx.options = value

  await next()
}
