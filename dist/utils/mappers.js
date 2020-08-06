"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getImageTypeString = exports.zoomLevelMapper = void 0;
var config_1 = __importDefault(require("../config"));
var infraredZoomMapping = {
    1: '1d',
    2: '4d',
    3: '8d'
};
var colorZoomMapping = {
    1: '1d',
    2: '4d',
    3: '8d',
    4: '16d',
    5: '20d'
};
var imageTypeToZoomMapping = {
    INFRARED_FULL: infraredZoomMapping,
    D531106: colorZoomMapping
};
var getImageTypeString = function (infrared) { return (infrared ? 'INFRARED_FULL' : 'D531106'); };
exports.getImageTypeString = getImageTypeString;
var zoomLevelMapper = function (imageType, zoom) {
    var zoomMapping = imageTypeToZoomMapping[imageType];
    return zoomMapping[zoom] || config_1["default"].defaultZoom;
};
exports.zoomLevelMapper = zoomLevelMapper;
//# sourceMappingURL=mappers.js.map