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
        const sourceFile = this.sourceFile;
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
            name: node.name.getText(sourceFile),
            type: TypesUtilities_1.default
                .loadFromTypeNode(sourceFile, node.type)
                .toJSON()
        };
    }
}
exports.PropertyMember = PropertyMember;
exports.default = PropertyMember;
