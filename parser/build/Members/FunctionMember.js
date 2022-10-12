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
        this.name = node.name && node.name.getText(file.node) || '';
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static parse(file, node) {
        if (!typescript_1.default.isFunctionDeclaration(node) &&
            !typescript_1.default.isFunctionExpression(node) &&
            !typescript_1.default.isConstructorDeclaration(node) &&
            !typescript_1.default.isConstructSignatureDeclaration(node) ||
            !node.name) {
            return;
        }
        return new FunctionMember(file, node);
    }
    /* *
     *
     *  Functions
     *
     * */
    getGeneric() {
        const functionMember = this, fileNode = functionMember.file.node, typeParameters = functionMember.node.typeParameters;
        if (!typeParameters) {
            return;
        }
        return typeParameters.map(parameter => parameter.getText(fileNode));
    }
    getParameters() {
        const functionMember = this, fileNode = functionMember.file.node, functionNode = functionMember.node, functionParameters = functionNode.parameters;
        if (!functionParameters.length) {
            return;
        }
        let name, parameters = {};
        for (const parameter of functionParameters) {
            name = (parameter.name.getText(fileNode) +
                (parameter.questionToken && '?'));
            parameters[name] = (parameter.type ?
                parameter.type.getText(fileNode) :
                '*');
        }
        return parameters;
    }
    getResult() {
        const functionMember = this, fileNode = functionMember.file.node, functionNode = functionMember.node, functionType = functionNode.type;
        if (!functionType) {
            return;
        }
        const result = functionType.getText(fileNode);
        if (result === 'void') {
            return;
        }
        return result;
    }
    toJSON() {
        const functionMember = this, meta = functionMember.getMeta(), name = functionMember.name, parameters = functionMember.getParameters(), result = functionMember.getResult();
        return {
            kind: 'function',
            name,
            parameters,
            result,
            meta
        };
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