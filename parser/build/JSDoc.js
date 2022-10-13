"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeExpression = exports.getName = exports.getComment = void 0;
const TypeScript = require("typescript");
/* *
 *
 *  Functions
 *
 * */
function getComment(node, sourceFile) {
    let comment = node.comment;
    if (comment instanceof Array) {
        comment = comment.map(comment => comment.getText(sourceFile)).join(' ');
    }
    return comment;
}
exports.getComment = getComment;
function getName(tag, sourceFile) {
    if (!TypeScript.isJSDocPropertyLikeTag(tag)) {
        return;
    }
    return tag.name.getText(sourceFile);
}
exports.getName = getName;
function getTypeExpression(tag, sourceFile) {
    if (!TypeScript.isJSDocPropertyLikeTag(tag)) {
        return;
    }
    return tag.typeExpression && tag.typeExpression.getText(sourceFile);
}
exports.getTypeExpression = getTypeExpression;
/* *
 *
 *  Default Export
 *
 * */
exports.default = {
    getComment,
    getName,
    getTypeExpression
};
//# sourceMappingURL=JSDoc.js.map