"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const Path = require("path");
const TypeScript = require("typescript");
const Git_1 = require("./Git");
const NPM_1 = require("./NPM");
const ProjectFile_1 = require("./ProjectFile");
/* *
 *
 *  Class
 *
 * */
class Project {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(branch, commit, npm, path, program, options) {
        this.branch = branch;
        this.commit = commit;
        this.date = new Date();
        this.npm = npm;
        this.options = Object.assign(Object.assign({}, Project.defaultOptions), options);
        this.path = path;
        this.program = program;
        this.typeChecker = program.getTypeChecker();
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static load(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            path = Project.System.resolvePath(path);
            const tsconfig = TypeScript.readJsonConfigFile(path, Project.System.readFile), config = TypeScript.parseJsonConfigFileContent(tsconfig, Project.System, path), program = TypeScript.createProgram(config.fileNames, config.options), cwd = program.getCurrentDirectory(), branch = yield Git_1.default.getActiveBranch(cwd), commit = yield Git_1.default.getLastCommit(cwd), npm = yield NPM_1.default.load(Path.join(cwd, 'package.json'));
            return new Project(branch, commit, npm, path, program, options);
        });
    }
    /* *
     *
     *  Functions
     *
     * */
    getFiles() {
        const project = this, projectPath = project.path, projectProgram = project.program, sourceFiles = projectProgram.getSourceFiles(), files = [];
        for (const file of sourceFiles) {
            if (!file.fileName.startsWith(projectPath) ||
                file.getChildCount(file) < 2) {
                continue;
            }
            files.push(ProjectFile_1.default.parse(project, file));
        }
        return files.sort((a, b) => {
            return (a.name < b.name ? -1 :
                a.name > b.name ? 1 :
                    0);
        });
    }
    toJSON() {
        const project = this, { branch, commit, date, npm, options } = project;
        return {
            branch,
            commit,
            date: date.toISOString(),
            description: npm.description,
            name: npm.name,
            options,
            repository: npm.repository,
            version: npm.version,
            files: project
                .getFiles()
                .map(file => file.toJSON())
        };
    }
}
exports.Project = Project;
/* *
 *
 *  Static Properties
 *
 * */
Project.System = TypeScript.sys;
Project.defaultOptions = {
    includePublic: true
};
/* *
 *
 *  Default Export
 *
 * */
exports.default = Project;
//# sourceMappingURL=Project.js.map