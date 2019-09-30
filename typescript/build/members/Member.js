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
        const nodeChildren = this._node.getChildren();
        let memberChild;
        for (let nodeChild of nodeChildren) {
            memberChild = MembersUtilities_1.default.load(nodeChild);
            if (typeof memberChild !== 'undefined') {
                memberChildren.push(memberChild);
            }
        }
        return memberChildren;
    }
    toJSON() {
        return {
            children: this
                .getChildren()
                .map(function (child) {
                return child.toJSON();
            })
        };
    }
}
exports.Member = Member;
exports.default = Member;
