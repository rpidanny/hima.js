"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var stream_1 = __importDefault(require("stream"));
var tmp_1 = __importDefault(require("tmp"));
var util_1 = require("util");
var source_1 = __importDefault(require("got/dist/source"));
var chunk_1 = __importDefault(require("../utils/chunk"));
var pipeline = util_1.promisify(stream_1["default"].pipeline);
var downloadBatch = function (tiles, timeout, batchSize, outputPath, log, progress) { return __awaiter(void 0, void 0, void 0, function () {
    var miniBatches, finalResponse, totalTiles, completedTiles, i, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                miniBatches = chunk_1["default"](tiles, batchSize);
                finalResponse = [];
                totalTiles = tiles.length;
                completedTiles = 0;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < miniBatches.length)) return [3, 4];
                log("Downloading batch " + i + "/" + (miniBatches.length - 1) + " of size " + miniBatches[i].length);
                return [4, Promise.all(miniBatches[i].map(function (tile) { return __awaiter(void 0, void 0, void 0, function () {
                        var file, stream, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    file = outputPath + "/" + tile.name;
                                    stream = fs_1["default"].createWriteStream(file);
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4, pipeline(source_1["default"].stream(tile.url, {
                                            timeout: timeout,
                                            retry: 4,
                                            headers: {
                                                Connection: 'keep-alive'
                                            }
                                        }), stream)];
                                case 2: return [2, _a.sent()];
                                case 3:
                                    err_1 = _a.sent();
                                    console.error("Failed to download " + tile.url);
                                    throw err_1;
                                case 4: return [2];
                            }
                        });
                    }); }))];
            case 2:
                response = _a.sent();
                finalResponse.concat(response);
                if (progress) {
                    completedTiles += miniBatches[i].length;
                    progress(completedTiles, totalTiles);
                }
                _a.label = 3;
            case 3:
                i++;
                return [3, 1];
            case 4: return [2, finalResponse];
        }
    });
}); };
exports["default"] = (function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var options, tiles, timeout, output, batchSize, log, progress, tempDir;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = ctx.options;
                if (!options) return [3, 3];
                tiles = options.tiles, timeout = options.timeout, output = options.output, batchSize = options.batchSize, log = options.log, progress = options.progress;
                if (!(tiles && timeout && output && batchSize && log)) return [3, 3];
                tempDir = tmp_1["default"].dirSync({ unsafeCleanup: true });
                if (!(tempDir && tempDir.name)) return [3, 3];
                return [4, downloadBatch(tiles, timeout, batchSize, tempDir.name, log, progress)];
            case 1:
                _a.sent();
                ctx.options = __assign(__assign({}, options), { tempDir: tempDir });
                return [4, next()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2];
        }
    });
}); });
//# sourceMappingURL=download-tiles.js.map