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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiteralType = void 0;
const T = __importStar(require("./index"));
const typescript_1 = __importStar(require("typescript"));
class LiteralType extends T.Type {
    /* *
     *
     *  Static Functions
     *
     * */
    static test(node) {
        return typescript_1.default.isLiteralTypeNode(node);
    }
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const typeNode = this.typeNode;
        return {
            kind: 'literal',
            kindID: typeNode.kind,
            name: this.toString(),
            unsupportedNode: this.isSupported ?
                undefined :
                typeNode
        };
    }
}
exports.LiteralType = LiteralType;
