import { downloadImages } from '../src'

downloadImages({
  zoom: 2,
  batchSize: 5,
  startDate: '2020/02/14 05:00:00',
  endDate: '2020/02/14 10:00:00',
  interval: 30, // 30 minutes
  // debug: true,
  progress: (c, t) => console.log(`${(c / t) * 100}% complete`),
})
  .then(console.log)
  .catch(console.error)
