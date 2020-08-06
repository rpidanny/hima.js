declare const getImageTypeString: (infrared: boolean) => string;
declare const zoomLevelMapper: (imageType: string, zoom: number) => string;
export { zoomLevelMapper, getImageTypeString };
