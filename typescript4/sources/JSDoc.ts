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

namespace JSDoc {

    export function extractComment(
        node: TypeScript.Node,
        sourceFile: TypeScript.SourceFile
    ): (string|undefined) {
        const comments: Array<string> = [],
            doclets = extractDoclets(node, sourceFile);

        let doclet: TypeScript.JSDoc;

        for (let i = 0, iEnd = doclets.length; i < iEnd; ++i) {
            doclet = doclets[i];

            if (doclet.comment) {
                comments.push(doclet.comment);
            }
        }

        return (comments.join('\n') || void 0);
    }

    export function extractDoclets(
        node: TypeScript.Node,
        sourceFile: TypeScript.SourceFile
    ): Array<TypeScript.JSDoc> {
        const children = node.getChildren(sourceFile),
            doclets: Array<TypeScript.JSDoc> = [];

        let child: TypeScript.Node;

        for (let i = 0, iEnd = children.length; i < iEnd; ++i) {
            child = children[i];

            if (TypeScript.isJSDoc(child)) {
                doclets.push(child);
            } else {
                break;
            }
        }

        return doclets;
    }

}

/* *
 *
 *  Export Default
 *
 * */

export default JSDoc;
