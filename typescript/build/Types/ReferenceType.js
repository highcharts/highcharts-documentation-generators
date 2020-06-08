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
const typescript_1 = __importDefault(require("typescript"));
const TypesUtilities_1 = __importDefault(require("../TypesUtilities"));
class ReferenceType extends T.Type {
    /* *
     *
     *  Static Functions
     *
     * */
    static test(node) {
        return typescript_1.default.isTypeReferenceNode(node);
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        return TypesUtilities_1.default.loadFromChildren(this.sourceFile, (this.typeNode.typeArguments || []));
    }
    getChildrenJSON() {
        const children = this.getChildren();
        if (children.length === 0) {
            return undefined;
        }
        return JSONUtilities_1.default.toJSONArray(children);
    }
    toJSON() {
        const superJSON = super.toJSON();
        return {
            genericArguments: this.getChildrenJSON(),
            kind: 'reference',
            kindID: superJSON.kindID,
            name: superJSON.name
        };
    }
}
exports.ReferenceType = ReferenceType;
exports.default = ReferenceType;
