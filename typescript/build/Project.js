"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        const children = [];
        const directoryPath = this.directoryPath;
        const fileNodes = this.program.getSourceFiles();
        let child;
        for (let fileNode of fileNodes) {
            if (!fileNode.fileName.startsWith(directoryPath)) {
                continue;
            }
            child = new M.FileMember(fileNode);
            if (typeof child !== 'undefined') {
                children.push(child);
            }
        }
        return children;
    }
    getChildrenJSON() {
        return this
            .getChildren()
            .map(Project.childrenJSONMapper);
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
