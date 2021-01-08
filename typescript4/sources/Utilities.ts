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

    /* *
     *
     *  Functions
     *
     * */

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
