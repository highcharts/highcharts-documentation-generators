/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as FS from 'fs';
import * as Path from 'path';

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
function getDirectoryPaths(
    directoryPath: string,
    recursive?: boolean
): Array<string> {
    const paths: Array<string> = [];

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
function getFilePaths(
    directoryPath: string,
    recursive?: boolean
): Array<string> {
    const paths: Array<string> = [];

    let entryPath;
    let entryStat;

    if (FS.existsSync(directoryPath)) {
        for (const entry of FS.readdirSync(directoryPath)) {

            entryPath = Path.join(directoryPath, entry);
            entryStat = FS.lstatSync(entryPath);

            if (entryStat.isFile()) {
                paths.push(entryPath);
            }
            else if (
                recursive &&
                entryStat.isDirectory()
            ) {
                paths.push(...getFilePaths(entryPath, recursive));
            }
        }
    }

    return paths;
}

export default {
    getDirectoryPaths,
    getFilePaths
};