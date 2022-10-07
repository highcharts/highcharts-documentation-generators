"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSDoc = void 0;
/* *
 *
 *  Imports
 *
 * */
const typescript_1 = __importStar(require("typescript"));
const Utilities_1 = __importDefault(require("./Utilities"));
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
                comments.push(typeof doclet.comment === 'string' ?
                    doclet.comment :
                    doclet.comment.map(node => extractComment(node, sourceFile)).join());
            }
        }
        return (comments.join('\n') || void 0);
    }
    JSDoc.extractComment = extractComment;
    function extractDoclets(node, sourceFile) {
        const doclets = [];
        if (typescript_1.default.isJSDoc(node)) {
            doclets.push(node);
        }
        else {
            const children = node.getChildren(sourceFile);
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
        }
        return doclets;
    }
    JSDoc.extractDoclets = extractDoclets;
    function extractSimpleComment(node, sourceFile, ignoreChildren) {
        switch (node.kind) {
            case typescript_1.SyntaxKind.MultiLineCommentTrivia:
            case typescript_1.SyntaxKind.SingleLineCommentTrivia:
                return node.getText(sourceFile);
        }
        if (!ignoreChildren) {
            return Utilities_1.default.extractInChildren(node, sourceFile, extractSimpleComment);
        }
        return void 0;
    }
    JSDoc.extractSimpleComment = extractSimpleComment;
    function extractTag(name, node, sourceFile) {
        return extractTags(node, sourceFile, [name])[0];
    }
    JSDoc.extractTag = extractTag;
    function extractTags(node, sourceFile, include = [], exclude = []) {
        const tags = (node.tags || []), extractedTags = [];
        let tag, tagName;
        for (let i = 0, iEnd = tags.length; i < iEnd; ++i) {
            tag = tags[i];
            tagName = tag.tagName.getText(sourceFile);
            if ((include.length && !include.includes(tagName)) ||
                (exclude.length && exclude.includes(tagName))) {
                continue;
            }
            extractedTags.push(tag);
        }
        return extractedTags;
    }
    JSDoc.extractTags = extractTags;
})(JSDoc = exports.JSDoc || (exports.JSDoc = {}));
/* *
 *
 *  Export Default
 *
 * */
exports.default = JSDoc;
