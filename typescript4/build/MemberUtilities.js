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
const typescript_1 = require("typescript");
const Utilities_1 = __importDefault(require("./Utilities"));
/* *
 *
 *  Namespace
 *
 * */
var MemberUtilities;
(function (MemberUtilities) {
    function extractKeyword(node, sourceFile, ignoreChildren) {
        switch (node.kind) {
            case typescript_1.SyntaxKind.ClassKeyword:
            case typescript_1.SyntaxKind.ConstructorKeyword:
            case typescript_1.SyntaxKind.EnumKeyword:
            case typescript_1.SyntaxKind.ExportKeyword:
            case typescript_1.SyntaxKind.FunctionKeyword:
            case typescript_1.SyntaxKind.GetKeyword:
            case typescript_1.SyntaxKind.GlobalKeyword:
            case typescript_1.SyntaxKind.ImportKeyword:
            case typescript_1.SyntaxKind.InterfaceKeyword:
            case typescript_1.SyntaxKind.ModuleKeyword:
            case typescript_1.SyntaxKind.NamespaceKeyword:
            case typescript_1.SyntaxKind.SetKeyword:
            case typescript_1.SyntaxKind.TypeKeyword:
                return node.getText(sourceFile);
        }
        if (!ignoreChildren) {
            return Utilities_1.default.extractInChildren(node, sourceFile, extractKeyword);
        }
        return void 0;
    }
    MemberUtilities.extractKeyword = extractKeyword;
    function extractModifiers(node, sourceFile) {
        let modifiers;
        if (node instanceof Array) {
            modifiers = node;
        }
        else if (node.modifiers) {
            modifiers = node.modifiers;
        }
        else {
            return void 0;
        }
        return modifiers.map(modifier => modifier.getText(sourceFile));
    }
    MemberUtilities.extractModifiers = extractModifiers;
    function extractSyntax(node, sourceFile, ignoreChildren) {
        switch (node.kind) {
            case typescript_1.SyntaxKind.SyntaxList:
                return node
                    .getChildren(sourceFile)
                    .map(node => node.getText(sourceFile));
        }
        if (!ignoreChildren) {
            return Utilities_1.default.extractInChildren(node, sourceFile, extractSyntax);
        }
        return void 0;
    }
    MemberUtilities.extractSyntax = extractSyntax;
})(MemberUtilities || (MemberUtilities = {}));
/* *
 *
 *  Default Export
 *
 * */
exports.default = MemberUtilities;
