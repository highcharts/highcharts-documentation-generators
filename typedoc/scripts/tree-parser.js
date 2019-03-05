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
var FS = __importStar(require("fs"));
/* *
 *
 *  Variables
 *
 * */
/**
 * Parsed tree
 */
var cachedTree;
/**
 * Lock for tree loading
 */
var cachedTreeLock;
/**
 * Gets the tree file by TypeDoc from cache or current working directory.
 *
 * @param typeDocJsonPath
 *        Path to tree file by TypeDoc
 */
function getTree(typeDocJsonPath) {
    Config.DEBUG_MODE && Library.info(__filename, ':getTree', arguments);
    while (cachedTreeLock) { }
    ;
    if (cachedTree) {
        return Promise.resolve(cachedTree);
    }
    else {
        return readTree(typeDocJsonPath).then(function (readedTree) {
            cachedTree = readedTree;
            return cachedTree;
        });
    }
}
exports.getTree = getTree;
/**
 * Reads the tree file by TypeDoc from the current working directory.
 *
 * @param typeDocJsonPath
 *        Path to tree file by TypeDoc
 */
function readTree(typeDocJsonPath) {
    Config.DEBUG_MODE && Library.info(__filename, ':readTree', arguments);
    cachedTreeLock = true;
    return new Promise(function (resolve, reject) { return FS.readFile(typeDocJsonPath, function (error, data) {
        cachedTreeLock = false;
        if (error) {
            reject(error);
        }
        else {
            resolve(JSON.parse(data.toString()));
        }
    }); });
}
