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
const FS = __importStar(require("fs"));
const Library = __importStar(require("./library"));
const Path = __importStar(require("path"));
/* *
 *
 *  Functions
 *
 * */
function generate(treeNode, outputPath) {
    Config.DEBUG_MODE && Library.info(__filename, ':generate', arguments);
    return new Promise((resolve) => {
        generateNavigation(treeNode, Path.join(outputPath, 'nav'));
        resolve(treeNode);
    });
}
exports.generate = generate;
function generateNavigation(treeNode, outputPathPrefix) {
    Config.DEBUG_MODE && Library.info(__filename, ':generateNavigation', arguments);
    writeNavigation(treeNode, (outputPathPrefix + '.' + treeNode.name));
    if (treeNode.children) {
        treeNode.children.forEach(childNode => {
            if (childNode.children) {
                generateNavigation(childNode, outputPathPrefix);
            }
        });
    }
}
function writeNavigation(treeNode, outputFilePath) {
    Config.DEBUG_MODE && Library.info(__filename, ':writeNavigation', arguments);
    const navigationNode = {
        description: treeNode.comment,
        children: [],
    };
    FS.writeFileSync(outputFilePath, JSON.stringify(navigationNode));
}
