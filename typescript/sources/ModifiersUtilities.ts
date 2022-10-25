/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import TS from 'typescript';

export class ModifiersUtilities {

    /* *
     *
     *  Functions
     *
     * */

    public static getModifierArray(
        modifiers: (ReadonlyArray<TS.Modifier>|undefined)
    ): Array<string> {

        const modifierArray: Array<string> = [];

        if (typeof modifiers === 'undefined') {
            return modifierArray;
        }

        let modifierString: (string|undefined);

        for (let modifier of modifiers) {

            modifierString = ModifiersUtilities.getModifierString(modifier);

            if (typeof modifierString !== 'undefined') {
                modifierArray.push(modifierString);
            }
        }

        return modifierArray;
    }

    public static getModifierString(modifier: TS.Modifier): (string|undefined) {
        switch (modifier.kind) {
            default:
                return;
            case TS.SyntaxKind.AbstractKeyword:
                return 'abstract';
            case TS.SyntaxKind.AsyncKeyword:
                return 'async';
            case TS.SyntaxKind.ConstKeyword:
                return 'const';
            case TS.SyntaxKind.DeclareKeyword:
                return 'declare';
            case TS.SyntaxKind.DefaultKeyword:
                return 'default';
            case TS.SyntaxKind.ExportKeyword:
                return 'export';
            case TS.SyntaxKind.PrivateKeyword:
                return 'private';
            case TS.SyntaxKind.ProtectedKeyword:
                return 'protected';
            case TS.SyntaxKind.PublicKeyword:
                return 'public';
            case TS.SyntaxKind.ReadonlyKeyword:
                return 'readonly';
            case TS.SyntaxKind.StaticKeyword:
                return 'static';
        }
    }
}

export default ModifiersUtilities;
