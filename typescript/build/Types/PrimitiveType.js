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
     *  Functions
     *
     * */
    toString() {
        switch (this.typeNode.kind) {
            default:
            case typescript_1.default.SyntaxKind.AnyKeyword:
                return 'any';
            case typescript_1.default.SyntaxKind.BigIntKeyword:
                return 'bigint';
            case typescript_1.default.SyntaxKind.BooleanKeyword:
                return 'boolean';
            case typescript_1.default.SyntaxKind.NeverKeyword:
                return 'never';
            case typescript_1.default.SyntaxKind.NullKeyword:
                return 'null';
            case typescript_1.default.SyntaxKind.NumberKeyword:
                return 'number';
            case typescript_1.default.SyntaxKind.ObjectKeyword:
                return 'object';
            case typescript_1.default.SyntaxKind.StringKeyword:
                return 'string';
            case typescript_1.default.SyntaxKind.SymbolKeyword:
                return 'symbol';
            case typescript_1.default.SyntaxKind.ThisKeyword:
                return 'this';
            case typescript_1.default.SyntaxKind.UndefinedKeyword:
                return 'undefined';
            case typescript_1.default.SyntaxKind.UnknownKeyword:
                return 'unknown';
            case typescript_1.default.SyntaxKind.VoidKeyword:
                return 'void';
        }
    }
}
exports.PrimitiveType = PrimitiveType;
exports.default = PrimitiveType;
