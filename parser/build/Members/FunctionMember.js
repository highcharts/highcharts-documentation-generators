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
exports.FunctionMember = void 0;
const Member_1 = __importDefault(require("../Member"));
const typescript_1 = __importDefault(require("typescript"));
/* *
 *
 *  Class
 *
 * */
class FunctionMember extends Member_1.default {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(file, node) {
        super(file, node);
        if (node.name) {
            this.name = node.name.getText(file.node);
        }
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static parse(file, node) {
        if (!typescript_1.default.isFunctionDeclaration(node) &&
            !typescript_1.default.isFunctionExpression(node)) {
            return;
        }
        return new FunctionMember(file, node);
    }
    /* *
     *
     *  Functions
     *
     * */
    toJSON(_skipChildren) {
        const functionMember = this, name = functionMember.name;
        return Object.assign(Object.assign({}, super.toJSON(true)), { kind: 'function', name });
    }
}
exports.FunctionMember = FunctionMember;
/* *
 *
 *  Registry
 *
 * */
Member_1.default.register(FunctionMember);
/* *
 *
 *  Default Export
 *
 * */
exports.default = FunctionMember;
//# sourceMappingURL=FunctionMember.js.map