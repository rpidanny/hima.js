import { hima } from '../src'

hima({
  zoom: 1,
  batchSize: 20,
  date: new Date(1581638400000), // 2020/02/14
})
  .then(console.log)
  .catch(console.error)
