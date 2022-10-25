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
const child_process_1 = __importDefault(require("child_process"));
const JSDoc_1 = __importDefault(require("./JSDoc"));
const Member_1 = __importDefault(require("./Member"));
const path_1 = __importDefault(require("path"));
const typescript_1 = __importStar(require("typescript"));
const Utilities_1 = __importDefault(require("./Utilities"));
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
        this.files = [];
        const cwd = process.cwd(), npm = require(`${cwd}/package.json`), resolvedPath = typescript_1.sys.resolvePath(path), parsedCommandLine = typescript_1.default.parseJsonConfigFileContent(typescript_1.default.readJsonConfigFile(resolvedPath, typescript_1.sys.readFile), typescript_1.sys, resolvedPath);
        this.branch = child_process_1.default.execSync('git rev-parse --abbrev-ref HEAD', { cwd }).toString().trim();
        this.commit = child_process_1.default.execSync('git rev-parse --short HEAD', { cwd }).toString().trim();
        this.date = new Date();
        this.description = npm.description;
        this.name = (npm.name || '');
        this.options = parsedCommandLine.options;
        this.path = path;
        this.program = typescript_1.default.createProgram(parsedCommandLine.fileNames, parsedCommandLine.options);
        this.repository = (typeof npm.repository === 'string' ?
            npm.repository :
            npm.repository && npm.repository.url);
        this.resolvedPath = resolvedPath;
        this.version = (npm.version || '');
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
    getFileNames() {
        return Object.keys(this.getJSONFiles());
    }
    getJSONFiles() {
        const project = this, jsonFiles = {}, projectFiles = project.getFiles();
        let sourceFile, sourceNode, sourcePath;
        for (let i = 0, iEnd = projectFiles.length; i < iEnd; ++i) {
            sourceFile = projectFiles[i];
            sourceNode = sourceFile.getChildAt(0, sourceFile);
            sourcePath = project.normalizePath(sourceFile.fileName);
            jsonFiles[sourcePath] = {
                kind: 'file',
                path: sourcePath,
                comment: JSDoc_1.default.extractSimpleComment(sourceNode, sourceFile),
                meta: Utilities_1.default.extractMeta(sourceFile, sourceFile),
                children: Member_1.default.parseNodeChildren(sourceNode, sourceFile, project)
            };
        }
        return jsonFiles;
    }
    getFiles() {
        const project = this, projectFiles = project.files;
        if (!projectFiles.length) {
            const resolvedPath = project.resolvedPath, sourceFiles = project.program.getSourceFiles();
            let sourceFile;
            for (let i = 0, iEnd = sourceFiles.length; i < iEnd; ++i) {
                sourceFile = sourceFiles[i];
                if (sourceFile.fileName.startsWith(resolvedPath)) {
                    projectFiles.push(sourceFile);
                }
            }
        }
        return projectFiles;
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
    toJSON() {
        const project = this, { branch, commit, date, description, name, repository, version } = project, fileNames = project.getFileNames(), jsonFiles = project.getJSONFiles();
        return {
            name,
            version,
            repository,
            branch,
            commit,
            date: date.toISOString(),
            description,
            files: fileNames
                .sort()
                .map(fileName => jsonFiles[fileName])
        };
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
