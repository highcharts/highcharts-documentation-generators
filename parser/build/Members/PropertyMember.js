"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyMember = void 0;
const TypeScript = require("typescript");
const Member_1 = require("../Member");
/* *
 *
 *  Class
 *
 * */
class PropertyMember extends Member_1.default {
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
        if (!TypeScript.isPropertyDeclaration(node) &&
            !TypeScript.isPropertySignature(node)) {
            return;
        }
        return new PropertyMember(file, node);
    }
    /* *
     *
     *  Functions
     *
     * */
    getType() {
        const propertyMember = this, fileNode = propertyMember.file.node, propertyNode = propertyMember.node, type = propertyNode.type;
        return (type ?
            type.getText(fileNode) :
            '*');
    }
    toJSON() {
        const propertyMember = this, commentTags = propertyMember.getCommentTags(), meta = propertyMember.getMeta(), name = propertyMember.name, type = propertyMember.getType();
        return {
            kind: 'property',
            name,
            type,
            commentTags,
            meta
        };
    }
}
exports.PropertyMember = PropertyMember;
/* *
 *
 *  Registry
 *
 * */
Member_1.default.register(PropertyMember);
/* *
 *
 *  Default Export
 *
 * */
exports.default = PropertyMember;
//# sourceMappingURL=PropertyMember.js.map