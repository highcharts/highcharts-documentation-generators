"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionMember = void 0;
const TypeScript = require("typescript");
const Member_1 = require("../Member");
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
        if (!TypeScript.isConstructorDeclaration(node) &&
            !TypeScript.isConstructSignatureDeclaration(node) &&
            !TypeScript.isFunctionDeclaration(node) &&
            !TypeScript.isFunctionExpression(node) &&
            !TypeScript.isMethodDeclaration(node) &&
            !TypeScript.isMethodSignature(node) ||
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
        const functionMember = this;
        const fileNode = functionMember.file.node;
        const typeParameters = functionMember.node.typeParameters;
        if (!typeParameters) {
            return;
        }
        return typeParameters.map(parameter => parameter.getText(fileNode));
    }
    getParameters() {
        const functionMember = this;
        const fileNode = functionMember.file.node;
        const functionNode = functionMember.node;
        const functionParameters = functionNode.parameters;
        if (!functionParameters.length) {
            return;
        }
        let name;
        let parameters = {};
        for (const parameter of functionParameters) {
            name = (parameter.name.getText(fileNode) +
                (parameter.questionToken ? '?' : ''));
            parameters[name] = (parameter.type ?
                parameter.type.getText(fileNode) :
                '*');
        }
        return parameters;
    }
    getResult() {
        const functionMember = this;
        const fileNode = functionMember.file.node;
        const functionNode = functionMember.node;
        const functionType = functionNode.type;
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
        const functionMember = this;
        const meta = functionMember.getMeta();
        const name = functionMember.name;
        const parameters = functionMember.getParameters();
        const result = functionMember.getResult();
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