import { createTimelapse } from '../src'

createTimelapse({
  quality: '2160',
  batchSize: 50,
  startDate: '2020/02/14 05:00:00Z',
  endDate: '2020/02/16 19:00:00Z',
  interval: 10, // 30 minutes
  debug: true,
  output: './video.mp4',
  progress: (c, t) => console.log(`${(c / t) * 100}% complete`),
})
  .then(console.log)
  .catch(console.error)
