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
var FS = __importStar(require("fs"));
var Library = __importStar(require("./library"));
var MkDirP = __importStar(require("mkdirp"));
var Path = __importStar(require("path"));
/* *
 *
 *  Functions
 *
 * */
function generate(treeNode, outputPath) {
    Library.debug(__filename, ':generate', arguments);
    return new Promise(function (resolve) {
        generateNavigation(treeNode, Path.join(outputPath, 'nav'));
        resolve(treeNode);
    });
}
exports.generate = generate;
function generateNavigation(treeNode, outputPathPrefix) {
    Library.debug(__filename, ':generateNavigation', arguments);
    writeNavigation(treeNode, Path.join(outputPathPrefix, treeNode.name + '.json'));
    if (treeNode.children) {
        treeNode.children.forEach(function (childNode) {
            if (childNode.children) {
                generateNavigation(childNode, outputPathPrefix);
            }
        });
    }
}
function writeNavigation(treeNode, outputFilePath) {
    Library.debug(__filename, ':writeNavigation', arguments);
    var navigationNode = {
        description: treeNode.comment,
        children: [],
    };
    MkDirP.sync(Path.dirname(outputFilePath));
    FS.writeFileSync(outputFilePath, JSON.stringify(navigationNode));
}
