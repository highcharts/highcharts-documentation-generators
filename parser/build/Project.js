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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const Git_1 = __importDefault(require("./Git"));
const NPM_1 = __importDefault(require("./NPM"));
const path_1 = __importDefault(require("path"));
const ProjectFile_1 = __importDefault(require("./ProjectFile"));
const typescript_1 = __importDefault(require("typescript"));
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
    constructor(branch, commit, npm, path, program, system) {
        this.branch = branch;
        this.commit = commit;
        this.date = new Date();
        this.npm = npm;
        this.path = path;
        this.program = program;
        this.system = system;
        this.typeChecker = program.getTypeChecker();
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static load(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const system = typescript_1.default.sys;
            path = system.resolvePath(path);
            const tsconfig = typescript_1.default.readJsonConfigFile(path, system.readFile), config = typescript_1.default.parseJsonConfigFileContent(tsconfig, system, path), program = typescript_1.default.createProgram(config.fileNames, config.options), cwd = program.getCurrentDirectory(), branch = yield Git_1.default.getActiveBranch(cwd), commit = yield Git_1.default.getLastCommit(cwd), npm = yield NPM_1.default.load(path_1.default.join(cwd, 'package.json'));
            return new Project(branch, commit, npm, path, program, system);
        });
    }
    /* *
     *
     *  Functions
     *
     * */
    getFiles() {
        const project = this, projectPath = project.path;
        return project.program
            .getSourceFiles()
            .filter(file => file.fileName.startsWith(projectPath))
            .map(file => ProjectFile_1.default.parse(project, file));
    }
    normalizePath(...paths) {
        const project = this, projectPath = project.path, system = project.system;
        let path = system.resolvePath(path_1.default.join(...paths));
        // .replace(/(?:\.d)?\.[jt]sx?$/, '');
        if (path_1.default.isAbsolute(path)) {
            path = path_1.default.relative(projectPath, path);
        }
        return path;
    }
    toJSON() {
        const project = this, { branch, commit, date, npm } = project;
        return {
            branch,
            commit,
            date: date.toISOString(),
            description: npm.description,
            name: npm.name,
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
 *  Default Export
 *
 * */
exports.default = Project;
//# sourceMappingURL=Project.js.map