"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
