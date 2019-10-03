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
const T = __importStar(require("./Types/index"));
const typescript_1 = __importDefault(require("typescript"));
class TypesUtilities {
    /* *
     *
     *  Static Functions
     *
     * */
    static loadFromChildren(nodeChildren) {
        const typeChildren = [];
        for (let nodeChild of nodeChildren) {
            if (typescript_1.default.isTypeNode(nodeChild)) {
                typeChildren.push(TypesUtilities.loadFromTypeNode(nodeChild));
            }
        }
        return typeChildren;
    }
    static loadFromTypeNode(typeNode) {
        if (typescript_1.default.isUnionTypeNode(typeNode)) {
            return new T.UnionType(typeNode);
        }
        return new T.Type(typeNode, true);
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor() { }
    ;
}
exports.TypesUtilities = TypesUtilities;
exports.default = TypesUtilities;
