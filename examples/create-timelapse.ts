import { createTimelapse, intervals } from '../src'

createTimelapse({
  quality: '2160',
  batchSize: 50,
  startDate: '2019/10/14 05:00:00Z',
  endDate: '2020/03/14 05:00:00Z',
  interval: intervals.DAY, // 1440 minutes
  debug: true,
  output: './video.mp4',
  progress: (c, t) => console.log(`${(c / t) * 100}% complete`),
})
  .then(console.log)
  .catch(console.error)
