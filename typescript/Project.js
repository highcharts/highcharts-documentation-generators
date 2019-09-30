"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const NamespaceMember_1 = __importDefault(require("./members/NamespaceMember"));
class Project {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(parsedCommandLine) {
        this._directoryPath = (parsedCommandLine.options.project ||
            process.cwd());
        this._program = typescript_1.default.createProgram(parsedCommandLine.fileNames, parsedCommandLine.options);
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static loadArguments(args) {
        return new Project(typescript_1.default.parseCommandLine(args));
    }
    static loadDirectory(directoryPath) {
        return Project.loadTSConfig(typescript_1.default.sys.resolvePath(directoryPath));
    }
    static loadTSConfig(filePath) {
        const tsConfig = typescript_1.default.readJsonConfigFile(typescript_1.default.sys.resolvePath(filePath), typescript_1.default.sys.readFile);
        const parsedCommandLine = typescript_1.default.parseJsonConfigFileContent(tsConfig, typescript_1.default.sys, filePath);
        return new Project(parsedCommandLine);
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        const directoryPath = this._directoryPath;
        let namespaceMember;
        return this._program
            .getSourceFiles()
            .filter(function (node) {
            return node.fileName.startsWith(directoryPath);
        })
            .map(function (node) {
            namespaceMember = new NamespaceMember_1.default();
            namespaceMember.loadNode(node);
            return namespaceMember;
        });
    }
}
exports.Project = Project;
exports.default = Project;
