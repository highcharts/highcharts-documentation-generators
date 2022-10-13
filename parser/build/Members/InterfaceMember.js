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
    getGeneric() {
        const interfaceMember = this, fileNode = interfaceMember.file.node, typeParameters = interfaceMember.node.typeParameters;
        if (!typeParameters) {
            return;
        }
        return typeParameters.map(parameter => parameter.getText(fileNode));
    }
    toJSON() {
        const interfaceMember = this, children = interfaceMember
            .getChildren()
            .map(child => child.toJSON()), commentTags = interfaceMember.getCommentTags(), generics = interfaceMember.getGeneric(), meta = interfaceMember.getMeta(), name = interfaceMember.name;
        return {
            kind: 'interface',
            name,
            generics,
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