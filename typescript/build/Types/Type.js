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
            unsupportedNode: this.isSupported ?
                undefined :
                typeNode
        };
    }
    toString() {
        return this.typeNode.kind.toString();
    }
}
exports.Type = Type;
exports.default = Type;
