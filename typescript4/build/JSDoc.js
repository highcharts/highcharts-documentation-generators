"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* *
 *
 *  Imports
 *
 * */
const typescript_1 = __importDefault(require("typescript"));
/* *
 *
 *  Namespace
 *
 * */
var JSDoc;
(function (JSDoc) {
    function extractComment(node, sourceFile) {
        const comments = [], doclets = extractDoclets(node, sourceFile);
        let doclet;
        for (let i = 0, iEnd = doclets.length; i < iEnd; ++i) {
            doclet = doclets[i];
            if (doclet.comment) {
                comments.push(doclet.comment);
            }
        }
        return (comments.join('\n') || void 0);
    }
    JSDoc.extractComment = extractComment;
    function extractDoclets(node, sourceFile) {
        const children = node.getChildren(sourceFile), doclets = [];
        let child;
        for (let i = 0, iEnd = children.length; i < iEnd; ++i) {
            child = children[i];
            if (typescript_1.default.isJSDoc(child)) {
                doclets.push(child);
            }
            else {
                break;
            }
        }
        return doclets;
    }
    JSDoc.extractDoclets = extractDoclets;
})(JSDoc || (JSDoc = {}));
/* *
 *
 *  Export Default
 *
 * */
exports.default = JSDoc;
