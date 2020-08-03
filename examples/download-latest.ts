import { hima } from '../src'

hima({
  output: './output',
})
  .then(console.log)
  .catch(console.error)
