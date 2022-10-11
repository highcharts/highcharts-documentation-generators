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
exports.ProjectFile = void 0;
const Member_1 = __importDefault(require("./Member"));
/* *
 *
 *  Class
 *
 * */
class ProjectFile {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(project, node) {
        this.nodeText = '';
        this.sourceText = '';
        this.file = this;
        this.node = node;
        this.project = project;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static parse(project, node) {
        return new ProjectFile(project, node);
    }
    /* *
     *
     *  Functions
     *
     * */
    getComment() {
        return '';
    }
    getTypeReflection() {
        const projectFile = this, project = projectFile.project, node = projectFile.node;
        return project.typeChecker.getTypeAtLocation(node);
    }
    toJSON(skipChildren) {
        const projectFile = this, node = projectFile.node, children = (skipChildren ?
            [] :
            Member_1.default
                .parseChildren(projectFile, node)
                .map(child => child.toJSON()));
        return Object.assign(Object.assign({}, Member_1.default.prototype.toJSON.call(projectFile, true)), { kind: 'file', path: node.fileName, children });
    }
}
exports.ProjectFile = ProjectFile;
/* *
 *
 *  Default Export
 *
 * */
exports.default = ProjectFile;
//# sourceMappingURL=ProjectFile.js.map