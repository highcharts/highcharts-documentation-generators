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
const Utilities_1 = __importDefault(require("./Utilities"));
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
    getChildren() {
        return Member_1.default.prototype.getChildren.call(this);
    }
    getComment() {
        return Member_1.default.prototype.getComment.call(this);
    }
    getReflectedType(member) {
        const projectFile = this, memberNode = member.node, memberType = projectFile.getTypeReflection(memberNode);
        return (memberType.pattern ?
            memberType.pattern.getText(projectFile.node) :
            'unknown');
    }
    getTypeReflection(node) {
        const projectFile = this, project = projectFile.project;
        return project.typeChecker.getTypeAtLocation(node || projectFile.node);
    }
    toJSON(skipChildren) {
        const projectFile = this, project = projectFile.project, node = projectFile.node, children = (skipChildren ?
            undefined :
            Member_1.default
                .parseChildren(projectFile, node)
                .map(child => child.toJSON())), comment = projectFile.getComment(), name = Utilities_1.default.relative(project.path, node.fileName);
        // .replace(/(?:\.d)?\.[jt]sx?$/u, ''),
        return {
            kind: 'file',
            name,
            comment,
            children
        };
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