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
exports.ClassMember = void 0;
const M = __importStar(require("./"));
const typescript_1 = __importDefault(require("typescript"));
class ClassMember extends M.Member {
    /* *
     *
     *  Static Functions
     *
     * */
    static test(node) {
        return (typescript_1.default.isClassDeclaration(node) ||
            typescript_1.default.isClassElement(node) ||
            typescript_1.default.isClassExpression(node));
    }
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const node = this.node;
        const sourceFile = this.sourceFile;
        const superJSON = super.toJSON();
        return {
            children: (superJSON.children || []),
            kind: 'class',
            kindID: superJSON.kindID,
            name: (node.name && node.name.getText(sourceFile) || '')
        };
    }
}
exports.ClassMember = ClassMember;
exports.default = ClassMember;
