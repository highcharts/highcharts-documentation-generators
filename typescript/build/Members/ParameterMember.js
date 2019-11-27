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
const TypesUtilities_1 = __importDefault(require("../TypesUtilities"));
class ParameterMember extends M.Member {
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
            kind: 'parameter',
            kindID: superJSON.kindID,
            name: node.name,
            type: TypesUtilities_1.default.loadFromTypeNode(sourceFile, node.type)
        };
    }
}
exports.ParameterMember = ParameterMember;
exports.default = ParameterMember;
