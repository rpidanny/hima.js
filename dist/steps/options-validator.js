"use strict";
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
var joi_1 = __importDefault(require("@hapi/joi"));
var timeoutValidationSchema = joi_1["default"].object()
    .keys({
    connect: joi_1["default"].number()["default"](15000),
    response: joi_1["default"].number()["default"](15000),
    request: joi_1["default"].number()["default"](30000)
})["default"]({
    connect: 15000,
    response: 15000,
    request: 30000
});
var imageOptionsValidationSchema = joi_1["default"].object()
    .keys({
    date: joi_1["default"].alternatives()["try"](joi_1["default"].date(), joi_1["default"].string())["default"]('latest'),
    zoom: joi_1["default"].number()["default"](1),
    parallel: joi_1["default"].boolean()["default"](true),
    infrared: joi_1["default"].boolean()["default"](false),
    output: joi_1["default"].string().optional(),
    batchSize: joi_1["default"].number()["default"](20),
    timeout: timeoutValidationSchema,
    debug: joi_1["default"].boolean()["default"](false),
    progress: joi_1["default"]["function"]().optional()
})["default"]({
    date: 'latest',
    zoom: 1,
    parallel: true,
    infrared: false,
    batchSize: 20,
    timeout: {
        connect: 15000,
        response: 15000,
        request: 30000
    },
    debug: false
});
exports["default"] = (function (ctx, next) { return __awaiter(void 0, void 0, void 0, function () {
    var rawOptions, _a, error, value;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                rawOptions = ctx.rawOptions;
                return [4, imageOptionsValidationSchema.validate(rawOptions, {
                        allowUnknown: false
                    })];
            case 1:
                _a = _b.sent(), error = _a.error, value = _a.value;
                if (error) {
                    throw error;
                }
                ctx.options = value;
                return [4, next()];
            case 2:
                _b.sent();
                return [2];
        }
    });
}); });
//# sourceMappingURL=options-validator.js.map