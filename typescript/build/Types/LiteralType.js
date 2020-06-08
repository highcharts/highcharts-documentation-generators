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
Object.defineProperty(exports, "__esModule", { value: true });
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
