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
exports.ArrayType = void 0;
const JSONUtilities_1 = __importDefault(require("../JSONUtilities"));
const T = __importStar(require("./index"));
const typescript_1 = __importDefault(require("typescript"));
const TypesUtilities_1 = __importDefault(require("../TypesUtilities"));
class ArrayType extends T.Type {
    /* *
     *
     *  Static Functions
     *
     * */
    static test(node) {
        return typescript_1.default.isArrayTypeNode(node);
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        return [
            TypesUtilities_1.default.loadFromTypeNode(this.sourceFile, this.typeNode.elementType)
        ];
    }
    getChildrenJSON() {
        return JSONUtilities_1.default.toJSONArray(this.getChildren());
    }
    toJSON() {
        const superJSON = super.toJSON();
        return {
            genericArguments: this.getChildrenJSON(),
            kind: 'array',
            kindID: superJSON.kindID,
            name: superJSON.name
        };
    }
}
exports.ArrayType = ArrayType;
exports.default = ArrayType;
