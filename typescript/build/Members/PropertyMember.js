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
const M = __importStar(require("./index"));
const ModifiersUtilities_1 = __importDefault(require("../ModifiersUtilities"));
const TypesUtilities_1 = __importDefault(require("../TypesUtilities"));
class PropertyMember extends M.Member {
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
        const node = this.node;
        const superJSON = super.toJSON();
        return {
            isNonOptional: typeof node.exclamationToken === 'undefined' ?
                undefined :
                true,
            isOptional: typeof node.questionToken === 'undefined' ?
                undefined :
                true,
            kind: 'property',
            kindID: superJSON.kindID,
            modifiers: ModifiersUtilities_1.default.getModifierArray(node.modifiers),
            types: JSONUtilities_1.default.toJSONArray(TypesUtilities_1.default.loadFromChildren(this.getChildNodes()))
        };
    }
}
exports.PropertyMember = PropertyMember;
exports.default = PropertyMember;
