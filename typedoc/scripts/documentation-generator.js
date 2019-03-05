"use strict";
/*
 * Copyright (C) Highsoft AS
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Config = __importStar(require("./config"));
var Library = __importStar(require("./library"));
/* *
 *
 *  Functions
 *
 * */
function generate() {
    Config.DEBUG_MODE && Library.info(__filename, ':generator', arguments);
    return new Promise(function (resolve, reject) {
        Library
            .exec('typedoc --help')
            .then(function () { return resolve(); })
            .catch(reject);
    });
}
exports.generate = generate;
