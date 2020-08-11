import { downloadImage } from '../src'

downloadImage({
  zoom: 1,
  batchSize: 5,
  date: '2020/01/22 18:30:20Z',
  debug: true,
})
  .then(console.log)
  .catch(console.error)
