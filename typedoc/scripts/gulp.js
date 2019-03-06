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
var Library = __importStar(require("./library"));
var Path = __importStar(require("path"));
/* *
 *
 *  Constants
 *
 * */
exports.THEME_DIRECTORY_PATH = Path.join(__dirname, '../theme');
/* *
 *
 *  Functions
 *
 * */
function gulpTaskFunction(tsConfigPath, outputDirectoryPath, outputJsonPath) {
    var tdConfigPath = Path.join(__dirname, '../typedoc.json');
    return Library
        .exec([
        'typedoc',
        '--json', '"' + outputJsonPath + '"',
        '--options', '"' + tdConfigPath + '"',
        '--out', '"' + outputDirectoryPath + '"',
        '--plugin', 'none',
        '--readme', '"README.md"',
        '--theme', '"' + exports.THEME_DIRECTORY_PATH + '"',
        '--tsconfig', '"' + tsConfigPath + '"'
    ].join(' '))
        .then(Library.info);
}
exports.gulpTaskFunction = gulpTaskFunction;
