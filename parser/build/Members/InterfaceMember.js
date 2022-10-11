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
    toJSON(_skipChildren) {
        const functionMember = this, name = functionMember.name;
        return Object.assign(Object.assign({}, super.toJSON(true)), { kind: 'interface', name });
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