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
class DocletTagMember extends M.Member {
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const superJSON = super.toJSON();
        const thisNode = this.node;
        return {
            kind: 'doclettag',
            kindID: superJSON.kindID,
            tag: thisNode.tagName.escapedText,
            text: thisNode.comment
        };
    }
}
exports.DocletTagMember = DocletTagMember;
exports.default = DocletTagMember;
