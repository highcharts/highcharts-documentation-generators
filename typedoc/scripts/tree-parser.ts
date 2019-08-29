/*
 * Copyright (C) Highsoft AS
 */

import * as Library from './library';
import * as FS from 'fs';

/* *
 *
 *  Interfaces
 *
 * */

/**
 * Tree node of TypeDoc
 */
export interface TreeNode {
    children?: Array<TreeNode>;
    comment?: {
        shortText: string;
        tags: Array<{
            tag: string;
            text: string;
        }>;
    };
    defaultValue?: string;
    flags: {
        isConst?: boolean;
        isExported?: boolean;
        isExternal?: boolean;
        isLet?: boolean;
    };
    groups?: Array<{
        title: string;
        kind: number;
        children: Array<number>;
    }>;
    id: number;
    kind: number;
    kindString?: string;
    name: string;
    originalName?: string;
    sources?: Array<{
        filename: string;
        line: number;
        caharacter: number;
    }>;
    type?: {
        type: string;
        name: string;
    }
}

/* *
 *
 *  Variables
 *
 * */

/**
 * Parsed tree
 */
let cachedTree: TreeNode;

/**
 * Lock for tree loading
 */
let cachedTreeLock: boolean;

/**
 * Gets the tree file by TypeDoc from cache or current working directory.
 *
 * @param typeDocJsonPath
 *        Path to tree file by TypeDoc
 */
export function getTree (typeDocJsonPath: string): Promise<TreeNode> {

    Library.debug(__filename, ':getTree', arguments);

    while (cachedTreeLock) {};

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

/**
 * Reads the tree file by TypeDoc from the current working directory.
 *
 * @param typeDocJsonPath
 *        Path to tree file by TypeDoc
 */
function readTree (typeDocJsonPath: string): Promise<TreeNode> {

    Library.debug(__filename, ':readTree', arguments);

    cachedTreeLock = true;

    return new Promise((resolve, reject) => FS.readFile(
        typeDocJsonPath,
        (error, data) => {

            cachedTreeLock = false;

            if (error) {
                reject(error);
            }
            else {
                resolve(JSON.parse(data.toString()));
            }
        }
    ));
}
