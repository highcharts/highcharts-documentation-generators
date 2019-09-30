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
const ModuleMember_1 = __importDefault(require("./Members/ModuleMember"));
class Project {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(parsedCommandLine, directoryPath) {
        this._directoryPath = (directoryPath || process.cwd());
        this._program = typescript_1.default.createProgram(parsedCommandLine.fileNames, parsedCommandLine.options);
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static loadFromArguments(args) {
        return new Project(typescript_1.default.parseCommandLine(args), process.cwd());
    }
    static loadFromDirectory(directoryPath) {
        const tsConfig = typescript_1.default.readJsonConfigFile(typescript_1.default.sys.resolvePath(directoryPath), typescript_1.default.sys.readFile);
        const parsedCommandLine = typescript_1.default.parseJsonConfigFileContent(tsConfig, typescript_1.default.sys, directoryPath);
        return new Project(parsedCommandLine, directoryPath);
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        const directoryPath = this._directoryPath;
        const memberChildren = [];
        const nodeChildren = this._program.getSourceFiles();
        for (let nodeChild of nodeChildren) {
            if (nodeChild.fileName.startsWith(directoryPath)) {
                memberChildren.push(new ModuleMember_1.default(nodeChild));
            }
        }
        return memberChildren;
    }
    toJSON() {
        return {
            children: this.getChildren(),
            kind: 'project',
            path: this._directoryPath
        };
    }
}
exports.Project = Project;
exports.default = Project;
