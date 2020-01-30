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
const D = __importStar(require("./Doclet"));
class DocletComment extends D.Doclet {
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const superJSON = super.toJSON();
        const thisNode = this.node;
        return {
            children: (superJSON.children || []),
            kind: 'doclet',
            kindID: superJSON.kindID,
            text: thisNode.getText()
        };
    }
}
exports.DocletComment = DocletComment;
exports.default = BlockMember;
