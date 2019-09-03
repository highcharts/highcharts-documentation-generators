/*
 * Copyright (C) Highsoft AS
 */

import * as FS from 'fs';
import * as Library from './library';
import * as MkDirP from 'mkdirp';
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

    Library.debug(__filename, ':generate', arguments);

    return new Promise((resolve) => {

        generateNavigation(treeNode, Path.join(outputPath, 'nav'));

        resolve(treeNode);
    });
}

function generateNavigation (
    treeNode: TreeParser.TreeNode,
    outputPathPrefix: string
) {

    Library.debug(__filename, ':generateNavigation', arguments);

    writeNavigation(
        treeNode, Path.join(outputPathPrefix, treeNode.name + '.json')
    );

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

    Library.debug(__filename, ':writeNavigation', arguments);

    const navigationNode = {
        description: treeNode.comment,
        children: [],
    };

    MkDirP.sync(Path.dirname(outputFilePath));

    FS.writeFileSync(outputFilePath, JSON.stringify(navigationNode));
}
