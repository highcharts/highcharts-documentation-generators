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
const Member_1 = __importDefault(require("../Member"));
class BlockMember extends Member_1.default {
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const node = this.node;
        if (typeof node === 'undefined') {
            return;
        }
        return {
            children: this.getChildren(),
            kind: 'block'
        };
    }
}
exports.BlockMember = BlockMember;
exports.default = BlockMember;
