/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
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
declare function getDirectoryPaths(directoryPath: string, recursive?: boolean): Array<string>;
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
declare function getFilePaths(directoryPath: string, recursive?: boolean): Array<string>;
declare const _default: {
    getDirectoryPaths: typeof getDirectoryPaths;
    getFilePaths: typeof getFilePaths;
};
export default _default;
