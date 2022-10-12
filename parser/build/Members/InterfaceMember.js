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
exports.InterfaceMember = void 0;
const Member_1 = __importDefault(require("../Member"));
const typescript_1 = __importDefault(require("typescript"));
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
        if (!typescript_1.default.isInterfaceDeclaration(node)) {
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
            .map(child => child.toJSON()), comment = interfaceMember.getComment(), generics = interfaceMember.getGeneric(), meta = interfaceMember.getMeta(), name = interfaceMember.name;
        return {
            kind: 'interface',
            name,
            generics,
            comment,
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