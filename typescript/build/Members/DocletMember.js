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
function childrenJSONMapper(nodeChild) {
    return nodeChild.toJSON();
}
class DocletMember extends M.Member {
    /* *
     *
     *  Functions
     *
     * */
    getChildNodes() {
        return (this.node.tags || []).slice();
    }
    getChildren() {
        const childNodes = this.getChildNodes();
        const children = [];
        const sourceFile = this.sourceFile;
        for (let childNode of childNodes) {
            children.push(new M.DocletTagMember(sourceFile, childNode));
        }
        return children;
    }
    getChildrenJSON() {
        return this
            .getChildren()
            .map(childrenJSONMapper);
    }
    toJSON() {
        const superJSON = super.toJSON();
        const thisChildrenJSON = this.getChildrenJSON();
        const thisNode = this.node;
        return {
            children: thisChildrenJSON,
            kind: 'doclet',
            kindID: superJSON.kindID,
            text: thisNode.comment
        };
    }
}
exports.DocletMember = DocletMember;
exports.default = DocletMember;
