"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveType = void 0;
const T = __importStar(require("./index"));
const typescript_1 = __importDefault(require("typescript"));
class PrimitiveType extends T.Type {
    /* *
     *
     *  Static Functions
     *
     * */
    static test(node) {
        switch (node.kind) {
            case typescript_1.default.SyntaxKind.AnyKeyword:
            case typescript_1.default.SyntaxKind.BigIntKeyword:
            case typescript_1.default.SyntaxKind.BooleanKeyword:
            case typescript_1.default.SyntaxKind.NeverKeyword:
            case typescript_1.default.SyntaxKind.NullKeyword:
            case typescript_1.default.SyntaxKind.NumberKeyword:
            case typescript_1.default.SyntaxKind.ObjectKeyword:
            case typescript_1.default.SyntaxKind.StringKeyword:
            case typescript_1.default.SyntaxKind.SymbolKeyword:
            case typescript_1.default.SyntaxKind.ThisKeyword:
            case typescript_1.default.SyntaxKind.UndefinedKeyword:
            case typescript_1.default.SyntaxKind.UnknownKeyword:
            case typescript_1.default.SyntaxKind.VoidKeyword:
                return true;
        }
        return false;
    }
}
exports.PrimitiveType = PrimitiveType;
exports.default = PrimitiveType;
