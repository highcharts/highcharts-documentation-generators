"use strict";
/*
 * Copyright (C) Highsoft AS
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = exports.THEME_DIRECTORY_PATH = void 0;
const Library = __importStar(require("./library"));
const Path = __importStar(require("path"));
const DocumentationGenerator = __importStar(require("./documentation-generator"));
const NavigationGenerator = __importStar(require("./navigation-generator"));
const TreeParser = __importStar(require("./tree-parser"));
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
        .then(() => DocumentationGenerator.generate(tsConfigPath, outputDirectoryPath, outputJsonPath))
        .then(() => TreeParser.getTree(outputJsonPath))
        .then(treeNode => NavigationGenerator.generate(treeNode, outputDirectoryPath));
}
exports.task = task;
exports.default = task;
