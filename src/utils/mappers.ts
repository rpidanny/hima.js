import config from '../config'
import * as types from '../types'

const infraredZoomMapping: types.ZoomMappings = {
  1: '1d',
  2: '4d',
  3: '8d',
}

const colorZoomMapping: types.ZoomMappings = {
  1: '1d',
  2: '4d',
  3: '8d',
}

const imageTypeToZoomMapping: types.ImageTypeToZoomMappings = {
  INFRARED_FULL: infraredZoomMapping,
  D531106: colorZoomMapping,
}

const zoomLevelMapper = (imageType: string, zoom: number): string => {
  const zoomMapping: types.ZoomMappings = imageTypeToZoomMapping[imageType]
  return zoomMapping[zoom] || config.defaultZoom
}

export { zoomLevelMapper }
