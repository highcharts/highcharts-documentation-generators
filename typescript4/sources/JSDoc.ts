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

import TypeScript, {
    SyntaxKind
} from 'typescript';
import Utilities from './Utilities';

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
        const doclets: Array<TypeScript.JSDoc> = [];

        if (TypeScript.isJSDoc(node)) {
            doclets.push(node);
        } else {
            const children = node.getChildren(sourceFile);

            let child: TypeScript.Node;

            for (let i = 0, iEnd = children.length; i < iEnd; ++i) {
                child = children[i];

                if (TypeScript.isJSDoc(child)) {
                    doclets.push(child);
                } else {
                    break;
                }
            }
        }

        return doclets;
    }

    export function extractSimpleComment(
        node: TypeScript.Node,
        sourceFile: TypeScript.SourceFile,
        ignoreChildren?: boolean
    ): (string|undefined) {
        switch (node.kind) {
            case SyntaxKind.MultiLineCommentTrivia:
            case SyntaxKind.SingleLineCommentTrivia:
                return node.getText(sourceFile);
        }

        if (!ignoreChildren) {
            return Utilities.extractInChildren(
                node,
                sourceFile,
                extractSimpleComment
            );
        }

        return void 0;
    }

}

/* *
 *
 *  Export Default
 *
 * */

export default JSDoc;
