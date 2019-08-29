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
const Library = __importStar(require("./library"));
const FS = __importStar(require("fs"));
/* *
 *
 *  Variables
 *
 * */
/**
 * Parsed tree
 */
let cachedTree;
/**
 * Lock for tree loading
 */
let cachedTreeLock;
/**
 * Gets the tree file by TypeDoc from cache or current working directory.
 *
 * @param typeDocJsonPath
 *        Path to tree file by TypeDoc
 */
function getTree(typeDocJsonPath) {
    Library.debug(__filename, ':getTree', arguments);
    while (cachedTreeLock) { }
    ;
    if (cachedTree) {
        return Promise.resolve(cachedTree);
    }
    else {
        return readTree(typeDocJsonPath).then(readedTree => {
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
    Library.debug(__filename, ':readTree', arguments);
    cachedTreeLock = true;
    return new Promise((resolve, reject) => FS.readFile(typeDocJsonPath, (error, data) => {
        cachedTreeLock = false;
        if (error) {
            reject(error);
        }
        else {
            resolve(JSON.parse(data.toString()));
        }
    }));
}
