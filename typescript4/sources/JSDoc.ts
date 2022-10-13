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

export namespace JSDoc {

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
                comments.push(
                    typeof doclet.comment === 'string' ?
                        doclet.comment :
                        doclet.comment.map(node => extractComment(node, sourceFile)).join()
                );
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

    export function extractTag(
        name: string,
        node: TypeScript.JSDoc,
        sourceFile: TypeScript.SourceFile
    ): (TypeScript.JSDocTag|undefined) {
        return extractTags(node, sourceFile, [name])[0];
    }

    export function extractTags(
        node: TypeScript.JSDoc,
        sourceFile: TypeScript.SourceFile,
        include: Array<string> = [],
        exclude: Array<string> = []
    ): Array<TypeScript.JSDocTag> {
        const tags = (node.tags || []),
            extractedTags: Array<TypeScript.JSDocTag> = [];

        let tag: TypeScript.JSDocTag,
            tagName: string;

        for (let i = 0, iEnd = tags.length; i < iEnd; ++i) {
            tag = tags[i];
            tagName = tag.tagName.getText(sourceFile);
            if (
                (include.length && !include.includes(tagName)) ||
                (exclude.length && exclude.includes(tagName))
            ) {
                continue;
            }
            extractedTags.push(tag);
        }

        return extractedTags;
    }

}

/* *
 *
 *  Export Default
 *
 * */

export default JSDoc;
