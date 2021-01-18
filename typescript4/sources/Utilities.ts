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
        const isSourceFile = TypeScript.isSourceFile(node),
            start = (
                isSourceFile ?
                    node.getFullStart() :
                    node.getStart(sourceFile)
            ),
            end = (
                isSourceFile ?
                    node.getFullWidth() :
                    node.getEnd()
            ),
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

    export function mergeObjects(
        source: JSON.Object,
        target: JSON.Object,
        propertiesToSkip?: Array<string>
    ): void {
        const properties = Object.keys(source);

        let property: string,
            value: (JSON.Collection|JSON.Primitive),
            targetValue: (JSON.Collection|JSON.Primitive);
 
        for (let i = 0, iEnd = properties.length; i < iEnd; ++i) {
            property = properties[i];

            if (
                propertiesToSkip &&
                propertiesToSkip.includes(property)
            ) {
                continue;
            }

            value = source[property];
            targetValue = target[property];

            if (value instanceof Array) {
                if (targetValue instanceof Array) {
                    targetValue.push(...value);
                } else {
                    target[property] = value.slice();
                }
            } else if (
                typeof value === 'object' &&
                typeof targetValue === 'object' &&
                value !== null &&
                targetValue !== null &&
                !(targetValue instanceof Array)
            ) {
                mergeObjects(value, targetValue, propertiesToSkip);
            } else if (
                typeof value === 'string' &&
                typeof targetValue === 'string'
            ) {
                target[property] = targetValue + '\n' + value;
            } else if (typeof target[property] === 'undefined') {
                target[property] = value;
            }
        }
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Utilities;
