/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as TypeScript from 'typescript';

/* *
 *
 *  Functions
 *
 * */

export function getComment(
    node: (TypeScript.JSDoc|TypeScript.JSDocTag),
    sourceFile?: TypeScript.SourceFile
): (string|undefined) {
    let comment = node.comment;

    if (comment instanceof Array) {
        comment = comment.map(comment => comment.getText(sourceFile)).join(' ');
    }

    return comment;
}

export function getName(
    tag: TypeScript.JSDocTag,
    sourceFile?: TypeScript.SourceFile
): (string|undefined) {

    if (!TypeScript.isJSDocPropertyLikeTag(tag)) {
        return;
    }

    return tag.name.getText(sourceFile);
}

export function getTypeExpression(
    tag: TypeScript.JSDocTag,
    sourceFile?: TypeScript.SourceFile
): (string|undefined) {

    if (!TypeScript.isJSDocPropertyLikeTag(tag)) {
        return;
    }

    return tag.typeExpression && tag.typeExpression.getText(sourceFile);
}

/* *
 *
 *  Default Export
 *
 * */

export default {
    getComment,
    getName,
    getTypeExpression
};
