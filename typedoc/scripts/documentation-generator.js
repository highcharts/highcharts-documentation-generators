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
 *  Functions
 *
 * */
function generate(tsConfigPath, outputDirectoryPath, outputJsonPath) {
    Library.debug(__filename, ':generator', arguments);
    var tdConfigPath = Path.relative(Library.CWD, Path.join(__dirname, '../typedoc.json'));
    var themeDirectoryPath = Path.relative(Library.CWD, Path.join(__dirname, '../theme'));
    return Library
        .exec([
        'npx',
        'typedoc',
        '--json', '"' + outputJsonPath + '"',
        '--options', '"' + tdConfigPath + '"',
        '--out', '"' + outputDirectoryPath + '"',
        '--readme', '"README.md"',
        // '--theme', '"' + themeDirectoryPath + '"',
        '--tsconfig', '"' + tsConfigPath + '"'
    ].join(' '))
        .then(function () { return undefined; });
}
exports.generate = generate;
