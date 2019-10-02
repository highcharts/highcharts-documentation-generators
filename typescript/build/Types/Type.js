"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
class Type {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(typeNode, isNotSupported = false) {
        this._isSupported = (isNotSupported === false);
        this._typeNode = typeNode;
    }
    get isSupported() {
        return this._isSupported;
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
            children: [],
            kind: '',
            kindID: typeNode.kind
        };
    }
    toString() {
        return this.typeNode.kind.toString();
    }
}
exports.Type = Type;
exports.default = Type;
