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
exports.Project = void 0;
const path_1 = __importDefault(require("path"));
const typescript_1 = __importStar(require("typescript"));
/* *
 *
 *  Class
 *
 * */
/**
 * Project to document.
 */
class Project {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(path) {
        /* *
         *
         *  Properties
         *
         * */
        this.files = {};
        const resolvedPath = typescript_1.sys.resolvePath(path), parsedCommandLine = typescript_1.default.parseJsonConfigFileContent(typescript_1.default.readJsonConfigFile(resolvedPath, typescript_1.sys.readFile), typescript_1.sys, resolvedPath);
        this.path = path;
        this.program = typescript_1.default.createProgram(parsedCommandLine.fileNames, parsedCommandLine.options);
        this.resolvedPath = resolvedPath;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static load(path) {
        return new Project(path);
    }
    /* *
     *
     *  Functions
     *
     * */
    createInterfaceMember(interfaceNode, sourceFile) {
        const project = this;
        return {
            kind: 'interface',
            name: interfaceNode.name.text,
            children: interfaceNode.members.map(node => project.parseNode(node, sourceFile))
        };
    }
    createModuleMember(moduleNode, sourceFile) {
        const project = this, children = moduleNode.getChildren(sourceFile);
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
            children: (declarations ?
                project.parseNodeChildren(declarations.getChildAt(1, sourceFile), sourceFile) :
                [])
        };
    }
    createPropertyMember(propertyNode, sourceFile) {
        var _a;
        let type = ((_a = propertyNode.type) === null || _a === void 0 ? void 0 : _a.getText(sourceFile)) || 'any';
        return {
            kind: 'property',
            name: propertyNode.name.getText(sourceFile),
            type
        };
    }
    createUnknownMember(unknownNode, sourceFile) {
        const project = this, unknownMember = {
            kind: typescript_1.SyntaxKind[unknownNode.kind],
            kindID: unknownNode.kind,
        };
        if (typescript_1.default.isInterfaceDeclaration(unknownNode)) {
            const children = project.parseNodeChildren(unknownNode, sourceFile);
            if (children.length) {
                unknownMember.children = children;
            }
        }
        return unknownMember;
    }
    normalizePath(...paths) {
        const project = this, resolvedPath = project.resolvedPath;
        let path = typescript_1.sys
            .resolvePath(path_1.default.join(...paths))
            .replace(/(?:\.d)?\.[jt]sx?$/, '');
        if (path_1.default.isAbsolute(path)) {
            path = path_1.default.relative(resolvedPath, path);
        }
        return path;
    }
    parseFiles() {
        const project = this, projectFiles = project.files, resolvedPath = project.resolvedPath, sourceFiles = project.program.getSourceFiles();
        if (!Object.keys(projectFiles).length) {
            let sourceFile, sourcePath;
            for (let i = 0, iEnd = sourceFiles.length; i < iEnd; ++i) {
                sourceFile = sourceFiles[i];
                if (sourceFile.fileName.startsWith(resolvedPath)) {
                    sourcePath = project.normalizePath(sourceFile.fileName);
                    projectFiles[sourcePath] = {
                        path: sourcePath,
                        children: project.parseNodeChildren(sourceFile.getChildAt(0, sourceFile), sourceFile)
                    };
                }
            }
        }
        return Object.values(projectFiles);
    }
    parseNode(node, sourceFile) {
        const project = this;
        if (typescript_1.default.isInterfaceDeclaration(node)) {
            return project.createInterfaceMember(node, sourceFile);
        }
        if (typescript_1.default.isModuleDeclaration(node)) {
            return project.createModuleMember(node, sourceFile);
        }
        if (typescript_1.default.isPropertySignature(node)) {
            return project.createPropertyMember(node, sourceFile);
        }
        return project.createUnknownMember(node, sourceFile);
    }
    parseNodeChildren(node, sourceFile) {
        const project = this;
        return node
            .getChildren(sourceFile)
            .map(child => project.parseNode(child, sourceFile));
    }
    toJSON() {
        const project = this;
        return project.parseFiles();
    }
    toString() {
        return '[object Project]';
    }
}
exports.Project = Project;
/* *
 *
 *  Default Export
 *
 * */
exports.default = Project;
