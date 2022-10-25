"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
const FS = require("fs");
const Path = require("path");
/**
 * Get sub-directory paths from a directory.
 *
 * @param directoryPath
 * Directory to get directories from
 *
 * @param recursive
 * Set to true to get directories inside sub-directories
 *
 * @return
 * Sub-directory paths
 */
function getDirectoryPaths(directoryPath, recursive) {
    const paths = [];
    let entryPath;
    let entryStat;
    if (FS.existsSync(directoryPath)) {
        for (const entry of FS.readdirSync(directoryPath)) {
            entryPath = Path.join(directoryPath, entry);
            entryStat = FS.lstatSync(entryPath);
            if (entryStat.isDirectory()) {
                paths.push(entryPath);
                if (recursive) {
                    paths.push(...getDirectoryPaths(entryPath, recursive));
                }
            }
        }
    }
    return paths;
}
/**
 * Get file paths from a directory.
 *
 * @param directoryPath
 * Directory to get files from
 *
 * @param recursive
 * Set to true to get files from sub-directories
 *
 * @return
 * File paths
 */
function getFilePaths(directoryPath, recursive) {
    const paths = [];
    let entryPath;
    let entryStat;
    if (FS.existsSync(directoryPath)) {
        for (const entry of FS.readdirSync(directoryPath)) {
            entryPath = Path.join(directoryPath, entry);
            entryStat = FS.lstatSync(entryPath);
            if (entryStat.isFile()) {
                paths.push(entryPath);
            }
            else if (recursive &&
                entryStat.isDirectory()) {
                paths.push(...getFilePaths(entryPath, recursive));
            }
        }
    }
    return paths;
}
exports.default = {
    getDirectoryPaths,
    getFilePaths
};
//# sourceMappingURL=Utilities.js.map