/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

/* *
 *
 *  Imports
 *
 * */

import type JSON from './JSON';

import TypeScript from 'typescript';

/* *
 *
 *  Namespace
 *
 * */

namespace Utilities {

    /* *
     *
     *  Declarations
     *
     * */

    type Extractor<T> = (
        node: TypeScript.Node,
        sourceFile: TypeScript.SourceFile,
        ignoreChildren?: boolean
    ) => T;

    export interface Meta extends JSON.Object {
        start: number;
        startLine: number;
        startColumn: number;
        end: number;
        endLine: number;
        endColumn: number;
    }

    /* *
     *
     *  Functions
     *
     * */

    export function extractMeta(
        node: TypeScript.Node,
        sourceFile: TypeScript.SourceFile
    ): Meta {
        const start = node.getStart(sourceFile),
            end = node.getEnd(),
            sourceText = sourceFile.getFullText(),
            startLines = sourceText.substr(0, start).split('\n'),
            startLine = startLines.length,
            startColumn = (startLines.pop() || '').length + 1,
            endLines = sourceText.substr(0, end).split('\n'),
            endLine = endLines.length,
            endColumn = (endLines.pop() || '').length + 1;

        return {
            start,
            startLine,
            startColumn,
            end,
            endLine,
            endColumn
        };
    }

    export function extractInChildren<T>(
        node: TypeScript.Node,
        sourceFile: TypeScript.SourceFile,
        extractor: Extractor<T>
    ): (T|undefined) {
        const children = node.getChildren(sourceFile);

        let result: T;

        for (let i = 0, iEnd = children.length; i < iEnd; ++i) {
            result = extractor(
                children[i],
                sourceFile,
                true
            );

            if (result) {
                return result;
            }
        }

        return void 0;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Utilities;
