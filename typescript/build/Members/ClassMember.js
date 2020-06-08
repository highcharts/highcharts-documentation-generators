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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const M = __importStar(require("./"));
const typescript_1 = __importDefault(require("typescript"));
class ClassMember extends M.Member {
    /* *
     *
     *  Static Functions
     *
     * */
    static test(node) {
        return (typescript_1.default.isClassDeclaration(node) ||
            typescript_1.default.isClassElement(node) ||
            typescript_1.default.isClassExpression(node));
    }
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const node = this.node;
        const sourceFile = this.sourceFile;
        const superJSON = super.toJSON();
        return {
            children: (superJSON.children || []),
            kind: 'class',
            kindID: superJSON.kindID,
            name: (node.name && node.name.getText(sourceFile) || '')
        };
    }
}
exports.ClassMember = ClassMember;
exports.default = ClassMember;
