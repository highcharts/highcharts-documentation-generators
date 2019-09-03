/*
 * Copyright (C) Highsoft AS
 */


import * as Library from './library';
import * as Path from 'path';

import * as DocumentationGenerator from './documentation-generator';
import * as NavigationGenerator from './navigation-generator';
import * as TreeParser from './tree-parser';

/* *
 *
 *  Constants
 *
 * */

export const THEME_DIRECTORY_PATH = Path.join(__dirname, '../theme');

/* *
 *
 *  Functions
 *
 * */

/**
 * Starts generator scripts
 */
export function task (
    tsConfigPath: string,
    outputDirectoryPath: string,
    outputJsonPath: string
): Promise<TreeParser.TreeNode> {

    Library.debug(__filename, ':main', arguments);

    return Promise
        .resolve()
        .then(() => DocumentationGenerator.generate(
            tsConfigPath, outputDirectoryPath, outputJsonPath
        ))
        .then(() => TreeParser.getTree(outputJsonPath))
        .then(treeNode => NavigationGenerator.generate(
            treeNode, outputDirectoryPath
        ));
}

export default task;
