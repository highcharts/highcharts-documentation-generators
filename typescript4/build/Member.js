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
const JSDoc_1 = __importDefault(require("./JSDoc"));
const path_1 = __importDefault(require("path"));
const MemberUtilities_1 = __importDefault(require("./MemberUtilities"));
const typescript_1 = __importStar(require("typescript"));
const Utilities_1 = __importDefault(require("./Utilities"));
/* *
 *
 *  Namespace
 *
 * */
var Member;
(function (Member) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    function parseClass(classNode, sourceFile, project) {
        return {
            kind: 'class',
            name: (classNode.name && classNode.name.text || '[anonymous]'),
            comment: JSDoc_1.default.extractComment(classNode, sourceFile),
            meta: Utilities_1.default.extractMeta(classNode, sourceFile),
            children: parseNodeChildren(classNode.members, sourceFile, project)
        };
    }
    function parseFunction(functionNode, sourceFile, project) {
        return {
            kind: 'function',
            name: (functionNode.name ?
                functionNode.name.getText(sourceFile) :
                '[anonymous]'),
            comment: JSDoc_1.default.extractComment(functionNode, sourceFile),
            meta: Utilities_1.default.extractMeta(functionNode, sourceFile),
            children: parseNodeChildren(functionNode.parameters, sourceFile, project)
        };
    }
    function parseInterface(interfaceNode, sourceFile, project) {
        return {
            kind: 'interface',
            name: interfaceNode.name.text,
            comment: JSDoc_1.default.extractComment(interfaceNode, sourceFile),
            meta: Utilities_1.default.extractMeta(interfaceNode, sourceFile),
            children: parseNodeChildren(interfaceNode.members, sourceFile, project)
        };
    }
    function parseModule(moduleNode, sourceFile, project) {
        const children = moduleNode.getChildren(sourceFile), comment = JSDoc_1.default.extractComment(moduleNode, sourceFile), isDeclaration = ((MemberUtilities_1.default.extractSyntax(moduleNode, sourceFile, true) || []).includes('declare') || void 0), isNamespace = (MemberUtilities_1.default.extractKeyword(moduleNode, sourceFile) === 'namespace' || void 0), meta = Utilities_1.default.extractMeta(moduleNode, sourceFile);
        let node, block, name, path;
        for (let i = 0, iEnd = children.length; i < iEnd; ++i) {
            node = children[i];
            if (typescript_1.default.isIdentifier(node)) {
                name = node.text;
            }
            else if (typescript_1.default.isModuleBlock(node)) {
                block = node;
            }
            else if (typescript_1.default.isStringLiteral(node)) {
                path = project.normalizePath(path_1.default.dirname(sourceFile.fileName), node.text);
            }
        }
        if (isNamespace) {
            return {
                kind: 'namespace',
                name: name || '[anonymous]',
                comment,
                isDeclaration,
                meta,
                children: (block ?
                    parseNodeChildren(block.statements, sourceFile, project) :
                    [])
            };
        }
        else {
            return {
                kind: 'module',
                path,
                name,
                comment,
                isDeclaration,
                meta,
                children: (block ?
                    parseNodeChildren(block.statements, sourceFile, project) :
                    [])
            };
        }
    }
    function parseNode(node, sourceFile, project) {
        if (typescript_1.default.isClassDeclaration(node)) {
            return parseClass(node, sourceFile, project);
        }
        else if (typescript_1.default.isFunctionDeclaration(node) ||
            typescript_1.default.isMethodDeclaration(node)) {
            return parseFunction(node, sourceFile, project);
        }
        else if (typescript_1.default.isInterfaceDeclaration(node)) {
            return parseInterface(node, sourceFile, project);
        }
        else if (typescript_1.default.isModuleDeclaration(node)) {
            return parseModule(node, sourceFile, project);
        }
        else if (typescript_1.default.isParameter(node)) {
            return parseParameter(node, sourceFile, project);
        }
        else if (typescript_1.default.isPropertyDeclaration(node) ||
            typescript_1.default.isPropertySignature(node)) {
            return parseProperty(node, sourceFile, project);
        }
        return parseUnknown(node, sourceFile, project);
    }
    Member.parseNode = parseNode;
    function parseNodeChildren(node, sourceFile, project) {
        let children;
        if (node instanceof Array) {
            children = node;
        }
        else {
            children = node.getChildren(sourceFile);
        }
        return children.map(child => parseNode(child, sourceFile, project));
    }
    Member.parseNodeChildren = parseNodeChildren;
    function parseParameter(parameterNode, sourceFile, project) {
        return {
            kind: 'parameter',
            name: parameterNode.name.getText(sourceFile),
            type: parameterNode.type && parseNodeChildren(parameterNode.type, sourceFile, project),
            meta: Utilities_1.default.extractMeta(parameterNode, sourceFile)
        };
    }
    function parseProperty(propertyNode, sourceFile, project) {
        return {
            kind: 'property',
            name: propertyNode.name.getText(sourceFile),
            comment: JSDoc_1.default.extractComment(propertyNode, sourceFile),
            modifiers: MemberUtilities_1.default.extractModifiers(propertyNode, sourceFile),
            optional: propertyNode.questionToken && true,
            type: propertyNode.type && parseNodeChildren(propertyNode.type, sourceFile, project),
            meta: Utilities_1.default.extractMeta(propertyNode, sourceFile)
        };
    }
    function parseUnknown(unknownNode, sourceFile, _project) {
        const unknownMember = {
            kind: typescript_1.SyntaxKind[unknownNode.kind],
            kindID: unknownNode.kind,
            syntax: MemberUtilities_1.default.extractSyntax(unknownNode, sourceFile),
            meta: Utilities_1.default.extractMeta(unknownNode, sourceFile)
        };
        return unknownMember;
    }
})(Member || (Member = {}));
/* *
 *
 *  Default Export
 *
 * */
exports.default = Member;
