"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const typescript = __importStar(require("typescript"));
class SourceParser {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(sourceDirectoryPath) {
        const tsConfig = typescript.readJsonConfigFile(path.join(sourceDirectoryPath, 'tsconfig.json'), typescript.sys.readFile);
        const commandLine = typescript.parseJsonConfigFileContent(tsConfig, typescript.sys, sourceDirectoryPath);
        this._sourceDirectoryPath = sourceDirectoryPath;
        this._typescript = typescript.createProgram(commandLine.fileNames, commandLine.options);
    }
    get sourceDirectoryPath() {
        return this._sourceDirectoryPath;
    }
    /* *
     *
     *  Functions
     *
     * */
    toAST() {
        const sourceDirectoryPath = this._sourceDirectoryPath;
        return this._typescript
            .getSourceFiles()
            .filter(function (sourceFile) {
            return sourceFile.fileName.startsWith(sourceDirectoryPath);
        });
    }
}
exports.SourceParser = SourceParser;
