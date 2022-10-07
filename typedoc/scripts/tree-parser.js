"use strict";
/*
 * Copyright (C) Highsoft AS
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.getTree = void 0;
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
