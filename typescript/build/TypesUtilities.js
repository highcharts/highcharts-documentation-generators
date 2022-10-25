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
exports.TypesUtilities = void 0;
const T = __importStar(require("./Types/index"));
const typescript_1 = __importDefault(require("typescript"));
class TypesUtilities {
    /* *
     *
     *  Static Functions
     *
     * */
    static loadFromChildren(sourceFile, nodeChildren) {
        const typeChildren = [];
        for (let nodeChild of nodeChildren) {
            if (typescript_1.default.isTypeNode(nodeChild)) {
                typeChildren.push(TypesUtilities.loadFromTypeNode(sourceFile, nodeChild));
            }
        }
        return typeChildren;
    }
    static loadFromTypeNode(sourceFile, typeNode) {
        if (typeof typeNode === 'undefined') {
            typeNode = typescript_1.default.createKeywordTypeNode(typescript_1.default.SyntaxKind.UndefinedKeyword);
        }
        if (T.UnionType.test(typeNode)) {
            return new T.UnionType(sourceFile, typeNode);
        }
        if (T.ReferenceType.test(typeNode)) {
            return new T.ReferenceType(sourceFile, typeNode);
        }
        if (T.PrimitiveType.test(typeNode)) {
            return new T.PrimitiveType(sourceFile, typeNode);
        }
        if (T.LiteralType.test(typeNode)) {
            return new T.LiteralType(sourceFile, typeNode);
        }
        if (typescript_1.default.isParenthesizedTypeNode(typeNode)) {
            typeNode = typeNode.type;
        }
        if (T.ArrayType.test(typeNode)) {
            return new T.ArrayType(sourceFile, typeNode);
        }
        return new T.Type(sourceFile, typeNode, true);
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor() { }
    ;
}
exports.TypesUtilities = TypesUtilities;
exports.default = TypesUtilities;
