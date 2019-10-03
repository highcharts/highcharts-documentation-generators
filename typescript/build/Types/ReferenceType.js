"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const JSONUtilities_1 = __importDefault(require("../JSONUtilities"));
const T = __importStar(require("./index"));
const TypesUtilities_1 = __importDefault(require("../TypesUtilities"));
class ReferenceType extends T.Type {
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const typeNode = this.typeNode;
        const sourceFile = this.sourceFile;
        const superJSON = super.toJSON();
        return {
            arguments: JSONUtilities_1.default.toJSONArray(TypesUtilities_1.default.loadFromChildren(sourceFile, (typeNode.typeArguments || []))),
            kind: 'reference',
            kindID: superJSON.kindID
        };
    }
}
exports.ReferenceType = ReferenceType;
exports.default = ReferenceType;
