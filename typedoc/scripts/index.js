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
const Config = __importStar(require("./config"));
const Library = __importStar(require("./library"));
const NavigationGenerator = __importStar(require("./navigation-generator"));
const TreeParser = __importStar(require("./tree-parser"));
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
function main(inputFilePath = Config.INPUT_FILE_PATH, outputPath = Config.OUTPUT_PATH) {
    Config.DEBUG_MODE && Library.info(__filename, ':main', arguments);
    return TreeParser
        .getTree(inputFilePath)
        .then(treeNode => NavigationGenerator.generate(treeNode, outputPath));
}
exports.default = main;
