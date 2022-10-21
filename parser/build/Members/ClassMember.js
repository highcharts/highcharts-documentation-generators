"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassMember = void 0;
const TypeScript = require("typescript");
const Member_1 = require("../Member");
/* *
 *
 *  Class
 *
 * */
class ClassMember extends Member_1.default {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(file, node) {
        var _a;
        super(file, node);
        this.name = ((_a = node.name) === null || _a === void 0 ? void 0 : _a.getText(file.node)) || '';
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static parse(file, node) {
        if (!TypeScript.isClassLike(node)) {
            return;
        }
        return new ClassMember(file, node);
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        const classMember = this;
        const file = classMember.file;
        const children = [];
        let child;
        for (const member of classMember.node.members) {
            child = Member_1.default.parse(file, member);
            if (child) {
                children.push(child);
            }
        }
        return children;
    }
    getGeneric() {
        const classMember = this;
        const fileNode = classMember.file.node;
        const typeParameters = classMember.node.typeParameters;
        if (!typeParameters) {
            return;
        }
        return typeParameters.map(parameter => parameter.getText(fileNode));
    }
    toJSON() {
        const classMember = this;
        const children = classMember
            .getChildren()
            .map(child => child.toJSON());
        const commentTags = classMember.getCommentTags();
        const generics = classMember.getGeneric();
        const meta = classMember.getMeta();
        const name = classMember.name;
        return {
            kind: 'class',
            name,
            generics,
            commentTags,
            meta,
            children
        };
    }
}
exports.ClassMember = ClassMember;
/* *
 *
 *  Registry
 *
 * */
Member_1.default.register(ClassMember);
/* *
 *
 *  Default Export
 *
 * */
exports.default = ClassMember;
//# sourceMappingURL=ClassMember.js.map