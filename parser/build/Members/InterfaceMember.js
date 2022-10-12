"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterfaceMember = void 0;
const Member_1 = __importDefault(require("../Member"));
const Members = __importStar(require("."));
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
    getChildren() {
        const interfaceMember = this, projectFile = interfaceMember.file, interfaceNode = interfaceMember.node;
        return Member_1.default
            .parseChildren(projectFile, interfaceNode)
            .filter(member => (member instanceof Members.FunctionMember ||
            member instanceof Members.PropertyMember));
    }
    getGeneric() {
        const interfaceMember = this, fileNode = interfaceMember.file.node, typeParameters = interfaceMember.node.typeParameters;
        if (!typeParameters) {
            return;
        }
        return typeParameters.map(parameter => parameter.getText(fileNode));
    }
    toJSON(skipChildren) {
        const interfaceMember = this, name = interfaceMember.name, children = (skipChildren ?
            void 0 :
            interfaceMember
                .getChildren()
                .map(child => child.toJSON())), comment = interfaceMember.getComment(), generics = interfaceMember.getGeneric();
        return {
            kind: 'interface',
            name,
            generics,
            comment,
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