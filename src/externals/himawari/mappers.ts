import config from '../../config'

export enum infraredZoomMapping {
  '1d' = 1,
  '4d',
  '8d',
}

export enum colorZoomMapping {
  '1d' = 1,
  '4d',
  '8d',
  '16d',
  '20d',
}

const imageTypeToZoomMapping = {
  INFRARED_FULL: infraredZoomMapping,
  D531106: colorZoomMapping,
}

const getImageTypeString = (infrared: boolean): string => (infrared ? 'INFRARED_FULL' : 'D531106')

const zoomLevelMapper = (imageType: string, zoom: number): string => {
  return imageTypeToZoomMapping[imageType][zoom] || config.defaultZoom
}

export { zoomLevelMapper, getImageTypeString }
