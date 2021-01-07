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
const Member_1 = __importDefault(require("./Member"));
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
                        children: Member_1.default.parseNodeChildren(sourceFile.getChildAt(0, sourceFile), sourceFile, this)
                    };
                }
            }
        }
        return Object.values(projectFiles);
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
