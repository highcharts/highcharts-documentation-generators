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
    constructor(branch, commit, cwd, npm, path, program, system) {
        this.branch = branch;
        this.commit = commit;
        this.cwd = cwd;
        this.date = new Date();
        this.npm = npm;
        this.path = path;
        this.program = program;
        this.system = system;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static load(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const system = typescript_1.default.sys, cwd = process.cwd(), branch = yield Git_1.default.getActiveBranch(cwd), commit = yield Git_1.default.getLastCommit(cwd), npm = yield NPM_1.default.load(cwd), resolvedPath = system.resolvePath(path), tsconfig = typescript_1.default.readJsonConfigFile(resolvedPath, system.readFile), config = typescript_1.default.parseJsonConfigFileContent(tsconfig, system, resolvedPath), program = typescript_1.default.createProgram(config.fileNames, config.options);
            return new Project(branch, commit, cwd, npm, path, program, system);
        });
    }
    /* *
     *
     *  Functions
     *
     * */
    getFileJSON() {
        const files = this.program.getSourceFiles();
        for (const file of files) {
            typescript_1.default.forEachChild(file, child => {
                console.log(child);
            });
        }
        return [];
    }
    toJSON() {
        const { branch, commit, date, npm } = this;
        return {
            branch,
            commit,
            date: date.toISOString(),
            description: npm.description,
            name: npm.name,
            repository: npm.repository,
            version: npm.version,
            files: this.getFileJSON()
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