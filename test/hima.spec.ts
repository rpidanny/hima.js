import { hima } from '../src'
import * as types from '../src/types'

describe('Hima module', () => {
  it('Should run without fail', async () => {
    const response: types.Success | types.Failure = await hima({
      zoom: 1,
    })
    return response
  })
})
