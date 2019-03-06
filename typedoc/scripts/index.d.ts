import * as TreeParser from './tree-parser';
export declare const THEME_DIRECTORY_PATH: string;
/**
 * Starts generator scripts
 */
export declare function task(tsConfigPath: string, outputDirectoryPath: string, outputJsonPath: string): Promise<TreeParser.TreeNode>;
export default task;
