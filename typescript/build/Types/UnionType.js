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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnionType = void 0;
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
