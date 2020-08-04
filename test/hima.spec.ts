import fs from 'fs-extra'

import { hima } from '../src'
import * as types from '../src/types'

describe('Hima module', () => {
  it('Should run without fail', async () => {
    const response: types.Success = await hima({
      zoom: 1,
    })
    await fs.remove(response.data.output)
    return response
  })
})
