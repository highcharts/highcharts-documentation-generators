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
var DocumentationGenerator = __importStar(require("./documentation-generator"));
var NavigationGenerator = __importStar(require("./navigation-generator"));
var TreeParser = __importStar(require("./tree-parser"));
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
/**
 * Starts generator scripts
 */
function task(tsConfigPath, outputDirectoryPath, outputJsonPath) {
    Library.debug(__filename, ':main', arguments);
    return Promise
        .resolve()
        .then(function () { return DocumentationGenerator.generate(tsConfigPath, outputDirectoryPath, outputJsonPath); })
        .then(function () { return TreeParser.getTree(outputJsonPath); })
        .then(function (treeNode) { return NavigationGenerator.generate(treeNode, outputDirectoryPath); });
}
exports.task = task;
exports.default = task;
