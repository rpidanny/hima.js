import { hima } from '../src'

hima({
  zoom: 4,
  batchSize: 20,
  debug: true,
})
  .then(console.log)
  .catch(console.error)
