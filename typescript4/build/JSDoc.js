"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
                comments.push(doclet.comment);
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
})(JSDoc || (JSDoc = {}));
/* *
 *
 *  Export Default
 *
 * */
exports.default = JSDoc;
