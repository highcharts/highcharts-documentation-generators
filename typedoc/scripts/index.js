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
var NavigationGenerator = __importStar(require("./navigation-generator"));
var TreeParser = __importStar(require("./tree-parser"));
/* *
 *
 *  Functions
 *
 * */
/**
 * Starts generator scripts
 *
 * @param inputFilePath
 *        Path to tree file by TypeDoc
 *
 * @param outputPath
 *        Path to output directory by TypeDoc
 */
function main(inputFilePath, outputPath) {
    if (inputFilePath === void 0) { inputFilePath = Config.INPUT_FILE_PATH; }
    if (outputPath === void 0) { outputPath = Config.OUTPUT_PATH; }
    Config.DEBUG_MODE && Library.info(__filename, ':main', arguments);
    return TreeParser
        .getTree(inputFilePath)
        .then(function (treeNode) { return NavigationGenerator.generate(treeNode, outputPath); });
}
exports.main = main;
exports.default = main;
