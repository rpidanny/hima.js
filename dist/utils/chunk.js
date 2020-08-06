"use strict";
exports.__esModule = true;
exports["default"] = (function (arr, size) {
    return Array.from({ length: Math.ceil(arr.length / size) }, function (_, i) {
        return arr.slice(i * size, i * size + size);
    });
});
//# sourceMappingURL=chunk.js.map