"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectFile = void 0;
const Member_1 = require("./Member");
const Utilities_1 = require("./Utilities");
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
        this.codeText = '';
        this.rangeText = '';
        /* *
         *
         *  Functions
         *
         * */
        this.getChildren = Member_1.default.prototype.getChildren;
        this.getComment = Member_1.default.prototype.getComment;
        this.getComments = Member_1.default.prototype.getComments;
        this.getCommentTags = Member_1.default.prototype.getCommentTags;
        this.getDebug = Member_1.default.prototype.getDebug;
        this.getMeta = Member_1.default.prototype.getMeta;
        this.file = this;
        this.name = Utilities_1.default.relative(project.path, node.fileName);
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
    getFirstComment() {
        const projectFile = this, fileNode = projectFile.node, firstNode = fileNode.getFirstToken(fileNode);
        if (!firstNode) {
            return;
        }
        const firstMember = Member_1.default.parse(projectFile, firstNode);
        if (!firstMember) {
            return;
        }
        const comment = firstMember.getComments();
        if (!comment ||
            !comment.includes('*/')) {
            return;
        }
        return comment.substring(0, comment.indexOf('*/') + 2);
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
    toJSON() {
        const projectFile = this, fileNode = projectFile.node, children = Member_1.default
            .parseChildren(projectFile, fileNode)
            .map(child => child.toJSON()), comment = projectFile.getFirstComment(), meta = projectFile.getMeta(), name = projectFile.name;
        return {
            kind: 'file',
            name,
            comment,
            meta,
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