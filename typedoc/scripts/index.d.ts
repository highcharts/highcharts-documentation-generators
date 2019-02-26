import * as TreeParser from './tree-parser';
/**
 * Starts generator scripts
 *
 * @param inputFilePath
 *        Path to tree file by TypeDoc
 *
 * @param outputPath
 *        Path to output directory by TypeDoc
 */
export declare function main(inputFilePath?: string, outputPath?: string): Promise<TreeParser.TreeNode>;
