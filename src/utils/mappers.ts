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
  4: '16d',
  5: '20d',
}

const imageTypeToZoomMapping: types.ImageTypeToZoomMappings = {
  INFRARED_FULL: infraredZoomMapping,
  D531106: colorZoomMapping,
}

const getImageTypeString = (infrared: boolean): string => (infrared ? 'INFRARED_FULL' : 'D531106')

const zoomLevelMapper = (imageType: string, zoom: number): string => {
  const zoomMapping: types.ZoomMappings = imageTypeToZoomMapping[imageType]
  return zoomMapping[zoom] || config.defaultZoom
}

export { zoomLevelMapper, getImageTypeString }
