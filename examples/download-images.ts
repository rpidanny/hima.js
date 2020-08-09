import { downloadImages, intervals } from '../src'

downloadImages({
  zoom: 2,
  batchSize: 100,
  startDate: '2020/02/14 05:00:00Z',
  endDate: '2020/03/14 05:00:00Z',
  interval: intervals.DAY, // 1440 minutes
  debug: true,
  output: './images',
  progress: (c, t) => console.log(`${(c / t) * 100}% complete`),
})
  .then(console.log)
  .catch(console.error)
