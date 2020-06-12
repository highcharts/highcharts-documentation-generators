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
exports.Member = void 0;
const MembersUtilities_1 = __importDefault(require("../MembersUtilities"));
const typescript_1 = __importDefault(require("typescript"));
function childrenJSONMapper(child) {
    return child.toJSON();
}
class Member {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(sourceFile, node, isNotSupported = false) {
        this._isNotSupported = isNotSupported;
        this._node = node;
        this._sourceFile = sourceFile;
    }
    get isNotSupported() {
        return this._isNotSupported;
    }
    get node() {
        return this._node;
    }
    get sourceFile() {
        return this._sourceFile;
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildNodes() {
        return this.node.getChildren(this.sourceFile);
    }
    getChildren() {
        return MembersUtilities_1.default.loadNodeChildren(this.sourceFile, this.getChildNodes());
    }
    getChildrenJSON() {
        return this
            .getChildren()
            .map(childrenJSONMapper);
    }
    toJSON() {
        const childrenJSON = this.getChildrenJSON();
        const node = this.node;
        return {
            children: childrenJSON.length === 0 ?
                undefined :
                childrenJSON,
            kind: typescript_1.default.SyntaxKind[node.kind],
            kindID: node.kind,
            name: this.toString(),
            unsupportedNode: this.isNotSupported ?
                node :
                undefined
        };
    }
    toString() {
        return typescript_1.default.getGeneratedNameForNode(this.node).escapedText.toString();
    }
}
exports.Member = Member;
exports.default = Member;
