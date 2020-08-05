import Joi from '@hapi/joi'

import * as types from '../types'

const timeoutValidationSchema = Joi.object()
  .keys({
    connect: Joi.number().default(2000),
    response: Joi.number().default(7000),
    request: Joi.number().default(9000),
  })
  .default({
    connect: 7000,
    response: 7000,
    request: 14000,
  })

const imageOptionsValidationSchema = Joi.object()
  .keys({
    date: Joi.string().default('latest'),
    zoom: Joi.number().default(1),
    parallel: Joi.boolean().default(true),
    infrared: Joi.boolean().default(false),
    output: Joi.string().optional(),
    timeout: timeoutValidationSchema,
  })
  .default({
    date: 'latest',
    zoom: 1,
    parallel: true,
    infrared: false,
    timeout: {
      connect: 7000,
      response: 7000,
      request: 14000,
    },
  })

export default async (ctx: types.Context, next: types.NextFunction): Promise<void> => {
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
