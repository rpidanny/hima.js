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
var path_1 = __importDefault(require("path"));
var commander_1 = require("commander");
var cli_progress_1 = __importDefault(require("cli-progress"));
var colors_1 = __importDefault(require("colors"));
var index_1 = require("./index");
var getProgressHandler = function (inputOpts) {
    if (inputOpts.quiet) {
        return;
    }
    var progressBar = new cli_progress_1["default"].SingleBar({
        format: "{status} |" + colors_1["default"].cyan('{bar}') + "| {percentage}% | {completed}/{totalTiles} Chunks",
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    }, cli_progress_1["default"].Presets.shades_classic);
    progressBar.start(100, 0, {
        percentage: 0,
        status: colors_1["default"].inverse('Downloading Image'),
        completed: 0,
        totalTiles: 0
    });
    return function (completed, totalTiles) {
        if (completed >= totalTiles) {
            progressBar.update((completed / totalTiles) * 100, {
                status: colors_1["default"].inverse.green('Download Complete'),
                completed: completed,
                totalTiles: totalTiles
            });
            return progressBar.stop();
        }
        progressBar.update((completed / totalTiles) * 100, {
            completed: completed,
            totalTiles: totalTiles
        });
    };
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var rootPath, program, inputOpts, output;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rootPath = process.cwd();
                    program = new commander_1.Command();
                    program.option('--out <path>', 'output directory', rootPath);
                    program.option('--date <date>', 'Date in yyyy/mm/dd hh:mm:ss', 'latest');
                    program.option('--zoom <level>', 'Zoom level. 1-3 for IR. 1-5 for color', '1');
                    program.option('--ir', 'Download Infrared Image', false);
                    program.option('--batch-size', 'How many tiles to download in parallel?', '20');
                    program.option('--debug', 'Enable debug logs?', false);
                    program.option('--quiet', 'Disable all logs?', false);
                    program.parse(process.argv);
                    inputOpts = program.opts();
                    return [4, index_1.hima({
                            date: inputOpts.date,
                            output: path_1["default"].resolve(inputOpts.out),
                            zoom: parseInt(inputOpts.zoom),
                            batchSize: (inputOpts.batchSize && parseInt(inputOpts.batchSize)) || 20,
                            infrared: inputOpts.ir,
                            debug: inputOpts.quiet || inputOpts.debug,
                            progress: getProgressHandler(inputOpts)
                        })];
                case 1:
                    output = (_a.sent()).output;
                    if (!inputOpts.quiet && output) {
                        console.log(colors_1["default"].green.inverse("File saved at " + output));
                    }
                    return [2];
            }
        });
    });
}
try {
    main();
}
catch (err) {
    console.error(err);
}
//# sourceMappingURL=cli.js.map