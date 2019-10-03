"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
class Type {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(sourceFile, typeNode, isNotSupported = false) {
        this._isSupported = (isNotSupported === false);
        this._sourceFile = sourceFile;
        this._typeNode = typeNode;
    }
    get isSupported() {
        return this._isSupported;
    }
    get sourceFile() {
        return this._sourceFile;
    }
    get typeNode() {
        return this._typeNode;
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        return [];
    }
    toJSON() {
        const typeNode = this.typeNode;
        return {
            kind: '',
            kindID: typeNode.kind,
            name: this.toString(),
            unsupportedNode: this.isSupported ?
                undefined :
                typeNode
        };
    }
    toString() {
        return typescript_1.default.getGeneratedNameForNode(this.typeNode).escapedText.toString();
    }
}
exports.Type = Type;
exports.default = Type;
