"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectFile = void 0;
const Member_1 = require("./Member");
const TypeScript = require("typescript");
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
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        const projectFile = this;
        const fileNode = projectFile.node;
        const children = [];
        const { debug, includePublic, includePrivate } = projectFile.project.options;
        let member;
        TypeScript.forEachChild(fileNode, child => {
            if (Member_1.default.skip.includes(child.kind)) {
                return;
            }
            if (includePublic &&
                (TypeScript.isExportAssignment(child) ||
                    TypeScript.isExportDeclaration(child))) {
                children.push(...Member_1.default.parseChildren(projectFile, child));
                return;
            }
            if (debug ||
                includePrivate) {
                member = Member_1.default.parse(projectFile, child);
                if (member) {
                    children.push(member);
                    return;
                }
            }
        });
        return children;
    }
    getComment() {
        const projectFile = this;
        const fileNode = projectFile.node;
        const firstNode = fileNode.getFirstToken(fileNode);
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
    getDecorators() {
        return;
    }
    getModifiers() {
        return;
    }
    getReflectedType(member) {
        const projectFile = this;
        const memberNode = member.node;
        const memberType = projectFile.getTypeReflection(memberNode);
        return (memberType.pattern ?
            memberType.pattern.getText(projectFile.node) :
            'unknown');
    }
    getTypeReflection(node) {
        const projectFile = this;
        const project = projectFile.project;
        return project.typeChecker.getTypeAtLocation(node || projectFile.node);
    }
    toJSON() {
        const projectFile = this;
        const children = projectFile
            .getChildren()
            .map(child => child.toJSON());
        const comment = projectFile.getComment();
        const meta = projectFile.getMeta();
        const name = projectFile.name;
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