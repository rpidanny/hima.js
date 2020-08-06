"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getLogger = void 0;
var colors_1 = __importDefault(require("colors"));
exports.getLogger = function (debug) {
    var enable = debug;
    return function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        if (enable) {
            var messages = msgs;
            var timeString = new Date().toLocaleTimeString();
            messages.unshift(colors_1["default"].green.inverse('[hima]') + ' ' + colors_1["default"].inverse(timeString) + ' ');
            console.log.apply(console, messages);
        }
    };
};
//# sourceMappingURL=logger.js.map