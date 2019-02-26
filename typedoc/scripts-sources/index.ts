/*
 * Copyright (C) Highsoft AS
 */

import * as Config from './config';
import * as Library from './library';
import * as NavigationGenerator from './navigation-generator';
import * as TreeParser from './tree-parser';

/* *
 *
 *  Functions
 *
 * */

/**
 * Starts generator scripts
 * 
 * @param inputFilePath
 *        Path to tree file by TypeDoc
 *
 * @param outputPath 
 *        Path to output directory by TypeDoc
 */
export function main (
    inputFilePath: string = Config.INPUT_FILE_PATH,
    outputPath: string = Config.OUTPUT_PATH
): Promise<TreeParser.TreeNode> {

    Config.DEBUG_MODE && Library.info(
        __filename, ':main', arguments
    );

    return TreeParser
        .getTree(inputFilePath)
        .then(treeNode => NavigationGenerator.generate(treeNode, outputPath));
}
