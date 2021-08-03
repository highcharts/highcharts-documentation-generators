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
exports.generate = void 0;
const FS = __importStar(require("fs"));
const Library = __importStar(require("./library"));
const MkDirP = __importStar(require("mkdirp"));
const Path = __importStar(require("path"));
/* *
 *
 *  Functions
 *
 * */
function generate(treeNode, outputPath) {
    Library.debug(__filename, ':generate', arguments);
    return new Promise((resolve) => {
        generateNavigation(treeNode, Path.join(outputPath, 'nav'));
        resolve(treeNode);
    });
}
exports.generate = generate;
function generateNavigation(treeNode, outputPathPrefix) {
    Library.debug(__filename, ':generateNavigation', arguments);
    writeNavigation(treeNode, Path.join(outputPathPrefix, treeNode.name + '.json'));
    if (treeNode.children) {
        treeNode.children.forEach(childNode => {
            if (childNode.children) {
                generateNavigation(childNode, outputPathPrefix);
            }
        });
    }
}
function writeNavigation(treeNode, outputFilePath) {
    Library.debug(__filename, ':writeNavigation', arguments);
    const navigationNode = {
        description: treeNode.comment,
        children: [],
    };
    MkDirP.sync(Path.dirname(outputFilePath));
    FS.writeFileSync(outputFilePath, JSON.stringify(navigationNode));
}
