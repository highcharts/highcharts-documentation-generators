"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
class Member {
    supportsNode(node) {
        return this.loadNode(node, true);
    }
}
exports.Member = Member;
exports.default = Member;
