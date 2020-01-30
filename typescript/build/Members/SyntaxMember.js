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
class SyntaxMember extends M.Member {
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const thisSourceFile = this.sourceFile;
        const superJSON = super.toJSON();
        const thisNode = this.node;
        return {
            children: superJSON.children,
            decorators: thisNode.decorators,
            kind: 'syntax',
            kindID: superJSON.kindID,
            text: thisNode.getFullText(thisSourceFile)
        };
    }
}
exports.SyntaxMember = SyntaxMember;
exports.default = DocletMember;
