/*
 * Copyright (C) Highsoft AS
 */

import * as Config from './config';
import * as FS from 'fs';
import * as Library from './library';
import * as Path from 'path';
import * as TreeParser from './tree-parser';

/* *
 *
 *  Functions
 *
 * */

export function generate (
    treeNode: TreeParser.TreeNode,
    outputPath: string
): Promise<TreeParser.TreeNode> {

    Config.DEBUG_MODE && Library.info(
        __filename, ':generate', arguments
    );

    return new Promise((resolve) => {

        generateNavigation(treeNode, Path.join(outputPath, 'nav'));

        resolve(treeNode);
    });
}

function generateNavigation (
    treeNode: TreeParser.TreeNode,
    outputPathPrefix: string
) {

    Config.DEBUG_MODE && Library.info(
        __filename, ':generateNavigation', arguments
    );

    writeNavigation(treeNode, (outputPathPrefix + '.' + treeNode.name));

    if (treeNode.children) {
        treeNode.children.forEach(childNode => {
            if (childNode.children) {
                generateNavigation(childNode, outputPathPrefix);
            }
        });
    }
}

function writeNavigation (
    treeNode: TreeParser.TreeNode, outputFilePath: string
) {

    Config.DEBUG_MODE && Library.info(
        __filename, ':writeNavigation', arguments
    );

    const navigationNode = {
        description: treeNode.comment,
        children: [],
    };

    FS.writeFileSync(outputFilePath, JSON.stringify(navigationNode));
}
