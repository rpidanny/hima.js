import { downloadImage } from '../src'

downloadImage({
  zoom: 1,
  batchSize: 20,
  date: new Date(1581638400000), // 2020/02/14
  debug: true,
})
  .then(console.log)
  .catch(console.error)
