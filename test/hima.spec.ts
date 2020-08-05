import fs from 'fs-extra'

import { hima } from '../src'
import * as types from '../src/types'

describe('Hima module', () => {
  it('Should download color image of zoom 1', async () => {
    const response: types.Success = await hima({
      zoom: 1,
    })
    await fs.remove(response.output)
    return response
  })

  it('Should download color image of zoom 5', async () => {
    const response: types.Success = await hima({
      zoom: 5,
    })
    await fs.remove(response.output)
    return response
  })

  it('Should download Infra-red image of zoom 1', async () => {
    const response: types.Success = await hima({
      zoom: 1,
      infrared: true,
    })
    await fs.remove(response.output)
    return response
  })

  it('Should download Infra-red image of zoom 3', async () => {
    const response: types.Success = await hima({
      zoom: 3,
      infrared: true,
    })
    await fs.remove(response.output)
    return response
  })
})
