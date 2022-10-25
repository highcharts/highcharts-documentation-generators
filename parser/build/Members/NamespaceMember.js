"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceMember = void 0;
const Member_1 = require("../Member");
const Utilities_1 = require("../Utilities");
/* *
 *
 *  Class
 *
 * */
class NamespaceMember extends Member_1.default {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(file, node) {
        super(file, node);
        this.name = node.name.getText(file.node) || '';
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static parse(file, node) {
        if (!Utilities_1.default.isNamespaceDeclaration(node)) {
            return;
        }
        return new NamespaceMember(file, node);
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        const moduleMember = this;
        const moduleNode = moduleMember.node;
        const file = moduleMember.file;
        return (moduleNode.body &&
            Member_1.default.parseChildren(file, moduleNode.body) ||
            []);
    }
    toJSON() {
        const namespaceMember = this;
        const children = namespaceMember
            .getChildren()
            .map(child => child.toJSON());
        const commentTags = namespaceMember.getCommentTags();
        const meta = namespaceMember.getMeta();
        const name = namespaceMember.name;
        return {
            kind: 'namespace',
            name,
            commentTags,
            meta,
            children
        };
    }
}
exports.NamespaceMember = NamespaceMember;
/* *
 *
 *  Registry
 *
 * */
Member_1.default.register(NamespaceMember);
/* *
 *
 *  Default Export
 *
 * */
exports.default = NamespaceMember;
//# sourceMappingURL=NamespaceMember.js.map