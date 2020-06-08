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
const T = __importStar(require("./index"));
const typescript_1 = __importDefault(require("typescript"));
const TypesUtilities_1 = __importDefault(require("../TypesUtilities"));
class UnionType extends T.Type {
    /* *
     *
     *  Static Functions
     *
     * */
    static test(node) {
        return typescript_1.default.isUnionTypeNode(node);
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        const sourceFile = this.sourceFile;
        const typeChildren = [];
        const typeNodes = this.typeNode.types;
        let typeChild;
        for (let typeNode of typeNodes) {
            typeChild = TypesUtilities_1.default.loadFromTypeNode(sourceFile, typeNode);
            if (typeChild.isSupported) {
                typeChildren.push(typeChild);
            }
            else {
                typeChildren.push(...typeChild.getChildren());
            }
        }
        return typeChildren;
    }
    toJSON() {
        const superJSON = super.toJSON();
        return {
            children: superJSON.children,
            kind: 'union',
            kindID: superJSON.kindID
        };
    }
    toString() {
        return this.typeNode.types.join('|');
    }
}
exports.UnionType = UnionType;
exports.default = UnionType;
