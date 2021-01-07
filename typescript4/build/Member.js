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
const typescript_1 = __importStar(require("typescript"));
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
    function createClass(classNode, sourceFile, project) {
        return {
            kind: 'class',
            name: (classNode.name && classNode.name.text || '[anonymous]'),
            comment: JSDoc_1.default.extractComment(classNode, sourceFile),
            children: classNode.members.map(node => parseNode(node, sourceFile, project))
        };
    }
    Member.createClass = createClass;
    function createInterface(interfaceNode, sourceFile, project) {
        return {
            kind: 'interface',
            name: interfaceNode.name.text,
            comment: JSDoc_1.default.extractComment(interfaceNode, sourceFile),
            children: interfaceNode.members.map(node => parseNode(node, sourceFile, project))
        };
    }
    Member.createInterface = createInterface;
    function createModule(moduleNode, sourceFile, project) {
        const children = moduleNode.getChildren(sourceFile);
        let node, name, path, declarations;
        for (let i = 0, iEnd = children.length; i < iEnd; ++i) {
            node = children[i];
            if (typescript_1.default.isIdentifier(node)) {
                name = node.text;
            }
            else if (typescript_1.default.isModuleBlock(node)) {
                declarations = node;
            }
            else if (typescript_1.default.isStringLiteral(node)) {
                path = project.normalizePath(path_1.default.dirname(sourceFile.fileName), node.text);
            }
        }
        return {
            kind: 'module',
            path,
            name,
            comment: JSDoc_1.default.extractComment(moduleNode, sourceFile),
            children: (declarations ?
                parseNodeChildren(declarations.getChildAt(1, sourceFile), sourceFile, project) :
                [])
        };
    }
    Member.createModule = createModule;
    function createProperty(propertyNode, sourceFile, _project) {
        var _a;
        let type = ((_a = propertyNode.type) === null || _a === void 0 ? void 0 : _a.getText(sourceFile)) || 'any';
        return {
            kind: 'property',
            name: propertyNode.name.getText(sourceFile),
            comment: JSDoc_1.default.extractComment(propertyNode, sourceFile),
            type
        };
    }
    Member.createProperty = createProperty;
    function createUnknown(unknownNode, sourceFile, project) {
        const unknownMember = {
            kind: typescript_1.SyntaxKind[unknownNode.kind],
            kindID: unknownNode.kind,
        };
        if (typescript_1.default.isInterfaceDeclaration(unknownNode)) {
            const children = parseNodeChildren(unknownNode, sourceFile, project);
            if (children.length) {
                unknownMember.children = children;
            }
        }
        return unknownMember;
    }
    Member.createUnknown = createUnknown;
    function parseNode(node, sourceFile, project) {
        if (typescript_1.default.isClassDeclaration(node)) {
            return createClass(node, sourceFile, project);
        }
        if (typescript_1.default.isInterfaceDeclaration(node)) {
            return createInterface(node, sourceFile, project);
        }
        if (typescript_1.default.isModuleDeclaration(node)) {
            return createModule(node, sourceFile, project);
        }
        if (typescript_1.default.isPropertySignature(node)) {
            return createProperty(node, sourceFile, project);
        }
        return createUnknown(node, sourceFile, project);
    }
    Member.parseNode = parseNode;
    function parseNodeChildren(node, sourceFile, project) {
        return node
            .getChildren(sourceFile)
            .map(child => parseNode(child, sourceFile, project));
    }
    Member.parseNodeChildren = parseNodeChildren;
})(Member || (Member = {}));
/* *
 *
 *  Default Export
 *
 * */
exports.default = Member;
