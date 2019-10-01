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
    constructor(node) {
        this._node = node;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static childrenJSONMapper(child) {
        return child.toJSON();
    }
    get node() {
        return this._node;
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        const memberChildren = [];
        let memberChild;
        let nodeChildren;
        try {
            nodeChildren = this.node.getChildren();
        }
        catch (error) {
            return [];
        }
        for (let nodeChild of nodeChildren) {
            memberChild = MembersUtilities_1.default.loadFromNode(nodeChild);
            if (typeof memberChild !== 'undefined') {
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
