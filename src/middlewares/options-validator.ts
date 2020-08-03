import Joi from '@hapi/joi'

import * as types from '../types'

const imageOptionsValidationSchema = Joi.object()
  .keys({
    date: Joi.string().default('latest'),
    zoom: Joi.number().default(1),
    parallel: Joi.boolean().default(true),
    infrared: Joi.boolean().default(false),
    output: Joi.string().required(),
    timeout: Joi.number().default(30000),
  })
  .default({
    date: 'latest',
    zoom: 1,
    parallel: true,
    infrared: false,
    timeout: 30000,
  })

export default async (ctx: types.Context, next: types.NextFunction): Promise<void> => {
  const { options } = ctx
  const { error, value } = await imageOptionsValidationSchema.validate(options, {
    allowUnknown: false,
  })

  if (error) {
    throw error
  }

  ctx.req = value

  await next()
}
