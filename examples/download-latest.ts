import { hima } from '../src'

hima({
  zoom: 5,
  batchSize: 20,
})
  .then(console.log)
  .catch(console.error)
