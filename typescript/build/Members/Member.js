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
const MembersUtilities_1 = __importDefault(require("../MembersUtilities"));
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
    /* *
     *
     *  Static Functions
     *
     * */
    static childrenJSONMapper(child) {
        return child.toJSON();
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
    getChildren() {
        const sourceFile = this.sourceFile;
        const nodeChildren = this.node.getChildren(sourceFile);
        const memberChildren = [];
        let memberChild;
        for (let nodeChild of nodeChildren) {
            memberChild = MembersUtilities_1.default.loadFromNode(sourceFile, nodeChild);
            if (memberChild.isNotSupported) {
                memberChildren.push(...memberChild.getChildren());
            }
            else {
                memberChildren.push(memberChild);
            }
        }
        return memberChildren;
    }
    getChildrenJSON() {
        return this
            .getChildren()
            .map(Member.childrenJSONMapper);
    }
    toJSON() {
        return {
            children: this.getChildrenJSON(),
            kind: '',
            kindID: this.node.kind
        };
    }
}
exports.Member = Member;
exports.default = Member;
