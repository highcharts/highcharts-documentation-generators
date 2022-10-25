"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceMember = void 0;
const TypeScript = require("typescript");
const Member_1 = require("../Member");
const Utilities_1 = require("../Utilities");
/* *
 *
 *  Class
 *
 * */
class InterfaceMember extends Member_1.default {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(file, node) {
        super(file, node);
        this.name = node.name.getText(file.node);
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static parse(file, node) {
        if (!TypeScript.isInterfaceDeclaration(node)) {
            return;
        }
        return new InterfaceMember(file, node);
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        const interfaceMember = this;
        const file = interfaceMember.file;
        const children = [];
        let child;
        for (const member of interfaceMember.node.members) {
            child = Member_1.default.parse(file, member);
            if (child) {
                children.push(child);
            }
        }
        return children;
    }
    getGenerics() {
        const interfaceMember = this;
        const fileNode = interfaceMember.file.node;
        const typeParameters = interfaceMember.node.typeParameters;
        if (!typeParameters) {
            return;
        }
        return Utilities_1.default.getStringArray(fileNode, typeParameters);
    }
    getInheritances() {
        const classMember = this;
        const classNode = classMember.node;
        const fileNode = classMember.file.node;
        const heritageClauses = classNode.heritageClauses;
        if (!heritageClauses) {
            return;
        }
        return Utilities_1.default.getStringArray(fileNode, heritageClauses);
    }
    toJSON() {
        const interfaceMember = this;
        const children = interfaceMember
            .getChildren()
            .map(child => child.toJSON());
        const commentTags = interfaceMember.getCommentTags();
        const generics = interfaceMember.getGenerics();
        const inheritances = interfaceMember.getInheritances();
        const meta = interfaceMember.getMeta();
        const name = interfaceMember.name;
        return {
            kind: 'interface',
            name,
            generics,
            inheritances,
            commentTags,
            meta,
            children
        };
    }
}
exports.InterfaceMember = InterfaceMember;
/* *
 *
 *  Registry
 *
 * */
Member_1.default.register(InterfaceMember);
/* *
 *
 *  Default Export
 *
 * */
exports.default = InterfaceMember;
//# sourceMappingURL=InterfaceMember.js.map