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

const imageOptionsValidationSchema = Joi.object()
  .keys({
    date: Joi.alternatives().try(Joi.date(), Joi.string()).default('latest'),
    zoom: Joi.number().default(1),
    parallel: Joi.boolean().default(true),
    infrared: Joi.boolean().default(false),
    output: Joi.string().optional(),
    batchSize: Joi.number().default(20),
    timeout: timeoutValidationSchema,
    debug: Joi.boolean().default(false),
    progress: Joi.function().optional(),
  })
  .default({
    date: 'latest',
    zoom: 1,
    parallel: true,
    infrared: false,
    batchSize: 20,
    timeout: {
      connect: 15000,
      response: 15000,
      request: 30000,
    },
    debug: false,
  })

export default async (ctx: Context, next: NextFunction): Promise<void> => {
  const { rawOptions } = ctx
  const { error, value } = await imageOptionsValidationSchema.validate(rawOptions, {
    allowUnknown: false,
  })

  if (error) {
    throw error
  }

  ctx.options = value

  await next()
}
