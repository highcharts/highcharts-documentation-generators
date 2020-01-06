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
const M = __importStar(require("./"));
class IdentifierMember extends M.Member {
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const node = this.node;
        const superJSON = super.toJSON();
        return {
            children: superJSON.children,
            kind: 'identifier',
            kindID: superJSON.kindID,
            modifiers: node.modifiers,
            name: node.escapedText.toString()
        };
    }
}
exports.IdentifierMember = IdentifierMember;
exports.default = IdentifierMember;
