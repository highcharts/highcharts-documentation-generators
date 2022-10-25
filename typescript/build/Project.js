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
exports.Project = void 0;
const M = __importStar(require("./Members/index"));
const typescript_1 = __importDefault(require("typescript"));
class Project {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(program) {
        this._program = program;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static childrenJSONMapper(child) {
        return child.toJSON();
    }
    static childrenFileMemberMapper(child) {
        return new M.FileMember(child);
    }
    static debug(sourcePath, targetPath) {
        const tsConfig = typescript_1.default.readJsonConfigFile(typescript_1.default.sys.resolvePath(sourcePath), typescript_1.default.sys.readFile);
        const parsedCommandLine = typescript_1.default.parseJsonConfigFileContent(tsConfig, typescript_1.default.sys, sourcePath);
        typescript_1.default.sys.writeFile(targetPath, JSON.stringify(typescript_1.default
            .createProgram(parsedCommandLine.fileNames, parsedCommandLine.options)
            .getSourceFiles()
            .slice()
            .map(sourceFile => ({
            fileName: sourceFile.fileName,
            children: sourceFile
                .getChildren(sourceFile)[0]
                .getChildren(sourceFile)
                .map(child => ({
                kind: child.kind,
                kindName: typescript_1.default.SyntaxKind[child.kind],
                text: child.getText(sourceFile).substr(0, 32)
            }))
        })), void 0, ' '));
    }
    static loadFromArguments(args) {
        const parsedCommandLine = typescript_1.default.parseCommandLine(args);
        return new Project(typescript_1.default.createProgram(parsedCommandLine.fileNames, parsedCommandLine.options));
    }
    static loadFromDirectory(directoryPath) {
        const tsConfig = typescript_1.default.readJsonConfigFile(typescript_1.default.sys.resolvePath(directoryPath), typescript_1.default.sys.readFile);
        const parsedCommandLine = typescript_1.default.parseJsonConfigFileContent(tsConfig, typescript_1.default.sys, directoryPath);
        const project = new Project(typescript_1.default.createProgram(parsedCommandLine.fileNames, parsedCommandLine.options));
        project.directoryPath = directoryPath;
        return project;
    }
    get directoryPath() {
        return (this._directoryPath || '');
    }
    set directoryPath(value) {
        if (typeof this._directoryPath === 'undefined') {
            this._directoryPath = value;
        }
    }
    get program() {
        return this._program;
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        return this
            .getSourceFiles()
            .map(Project.childrenFileMemberMapper);
    }
    getChildrenJSON() {
        return this
            .getChildren()
            .map(Project.childrenJSONMapper);
    }
    getSourceFiles() {
        const filteredSourceFiles = [];
        const directoryPath = this.directoryPath;
        const fullPath = typescript_1.default.sys.resolvePath(directoryPath);
        const sourceFiles = this.program.getSourceFiles();
        for (let fileNode of sourceFiles) {
            if (fileNode.fileName.startsWith(directoryPath) ||
                fileNode.fileName.startsWith(fullPath)) {
                filteredSourceFiles.push(fileNode);
            }
        }
        return filteredSourceFiles;
    }
    toJSON() {
        return {
            children: this.getChildrenJSON(),
            kind: 'project',
            kindID: typescript_1.default.SyntaxKind.Unknown,
            path: this.directoryPath
        };
    }
}
exports.Project = Project;
exports.default = Project;
