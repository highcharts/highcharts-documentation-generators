"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifiersUtilities = void 0;
const typescript_1 = __importDefault(require("typescript"));
class ModifiersUtilities {
    /* *
     *
     *  Functions
     *
     * */
    static getModifierArray(modifiers) {
        const modifierArray = [];
        if (typeof modifiers === 'undefined') {
            return modifierArray;
        }
        let modifierString;
        for (let modifier of modifiers) {
            modifierString = ModifiersUtilities.getModifierString(modifier);
            if (typeof modifierString !== 'undefined') {
                modifierArray.push(modifierString);
            }
        }
        return modifierArray;
    }
    static getModifierString(modifier) {
        switch (modifier.kind) {
            default:
                return;
            case typescript_1.default.SyntaxKind.AbstractKeyword:
                return 'abstract';
            case typescript_1.default.SyntaxKind.AsyncKeyword:
                return 'async';
            case typescript_1.default.SyntaxKind.ConstKeyword:
                return 'const';
            case typescript_1.default.SyntaxKind.DeclareKeyword:
                return 'declare';
            case typescript_1.default.SyntaxKind.DefaultKeyword:
                return 'default';
            case typescript_1.default.SyntaxKind.ExportKeyword:
                return 'export';
            case typescript_1.default.SyntaxKind.PrivateKeyword:
                return 'private';
            case typescript_1.default.SyntaxKind.ProtectedKeyword:
                return 'protected';
            case typescript_1.default.SyntaxKind.PublicKeyword:
                return 'public';
            case typescript_1.default.SyntaxKind.ReadonlyKeyword:
                return 'readonly';
            case typescript_1.default.SyntaxKind.StaticKeyword:
                return 'static';
        }
    }
}
exports.ModifiersUtilities = ModifiersUtilities;
exports.default = ModifiersUtilities;
