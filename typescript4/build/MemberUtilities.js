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
        else if (typescript_1.default.canHaveDecorators(node)) {
            modifiers = typescript_1.default.getModifiers(node) || [];
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
