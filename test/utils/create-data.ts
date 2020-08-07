// import * as types from '../../src/types'
import * as imageTypes from '../../src/usecases/download-image/types'
import * as imagesTypes from '../../src/usecases/download-images/types'

const createImageOptions = (options: imageTypes.Options): imageTypes.Options => {
  const { date, batchSize, zoom, infrared, output, log, imageType } = options
  return {
    date: date || 'latest',
    batchSize: batchSize || 20,
    zoom: zoom || 1,
    infrared: infrared || false,
    output: output || './image.jpg',
    log,
    imageType: imageType || 'D531106',
  }
}

const createImagesOptions = (options: imagesTypes.Options): imagesTypes.Options => {
  const { startDate, endDate, interval, batchSize, zoom, infrared, output, log } = options
  return {
    startDate,
    endDate,
    interval: interval || 30,
    batchSize: batchSize || 20,
    zoom: zoom || 1,
    infrared: infrared || false,
    output: output || './image.jpg',
    log,
  }
}

export { createImageOptions, createImagesOptions }
