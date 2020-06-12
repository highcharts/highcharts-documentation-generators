"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocletMember = void 0;
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
        const node = this.node;
        const superJSON = super.toJSON();
        const thisChildrenJSON = this.getChildrenJSON();
        return {
            children: thisChildrenJSON,
            kind: 'doclet',
            kindID: superJSON.kindID,
            text: node.comment
        };
    }
}
exports.DocletMember = DocletMember;
exports.default = DocletMember;
