"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleMember = void 0;
const Member_1 = require("../Member");
const Utilities_1 = require("../Utilities");
/* *
 *
 *  Class
 *
 * */
class ModuleMember extends Member_1.default {
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
        if (!Utilities_1.default.isModuleDeclaration(node)) {
            return;
        }
        return new ModuleMember(file, node);
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        const moduleMember = this;
        const file = moduleMember.file;
        const moduleNode = moduleMember.node;
        return (moduleNode.body &&
            Member_1.default.parseChildren(file, moduleNode.body) ||
            []);
    }
    toJSON() {
        const moduleMember = this;
        const children = moduleMember
            .getChildren()
            .map(child => child.toJSON());
        const commentTags = moduleMember.getCommentTags();
        const meta = moduleMember.getMeta();
        const name = moduleMember.name;
        return {
            kind: 'module',
            name,
            commentTags,
            meta,
            children
        };
    }
}
exports.ModuleMember = ModuleMember;
/* *
 *
 *  Registry
 *
 * */
Member_1.default.register(ModuleMember);
/* *
 *
 *  Default Export
 *
 * */
exports.default = ModuleMember;
//# sourceMappingURL=ModuleMember.js.map