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
class ArrayType extends T.Type {
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        return [
            TypesUtilities_1.default.loadFromTypeNode(this.sourceFile, this.typeNode.elementType)
        ];
    }
    getChildrenJSON() {
        return JSONUtilities_1.default.toJSONArray(this.getChildren());
    }
    toJSON() {
        const superJSON = super.toJSON();
        return {
            genericArguments: this.getChildrenJSON(),
            kind: 'array',
            kindID: superJSON.kindID,
            name: superJSON.name
        };
    }
}
exports.ArrayType = ArrayType;
exports.default = ArrayType;
