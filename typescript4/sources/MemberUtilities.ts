/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

/* *
 *
 *  Imports
 *
 * */

import TypeScript, {
    SyntaxKind
} from 'typescript';
import Utilities from './Utilities';

/* *
 *
 *  Namespace
 *
 * */

namespace MemberUtilities {

    export function extractKeyword(
        node: TypeScript.Node,
        sourceFile: TypeScript.SourceFile,
        ignoreChildren?: boolean
    ): (string|undefined) {
        switch (node.kind) {
            case SyntaxKind.ClassKeyword:
            case SyntaxKind.ConstructorKeyword:
            case SyntaxKind.EnumKeyword:
            case SyntaxKind.ExportKeyword:
            case SyntaxKind.FunctionKeyword:
            case SyntaxKind.GetKeyword:
            case SyntaxKind.GlobalKeyword:
            case SyntaxKind.ImportKeyword:
            case SyntaxKind.InterfaceKeyword:
            case SyntaxKind.ModuleKeyword:
            case SyntaxKind.NamespaceKeyword:
            case SyntaxKind.SetKeyword:
            case SyntaxKind.TypeKeyword:
                return node.getText(sourceFile);
        }

        if (!ignoreChildren) {
            return Utilities.extractInChildren(node, sourceFile, extractKeyword);
        }

        return void 0;
    }

    export function extractModifiers(
        node: (TypeScript.ModifiersArray|TypeScript.Node),
        sourceFile: TypeScript.SourceFile
    ): (Array<string>|undefined) {
        let modifiers: TypeScript.ModifiersArray;

        if (node instanceof Array) {
            modifiers = node
        } else if (
            node.modifiers
        ) {
            modifiers = node.modifiers
        } else {
            return void 0;
        }

        return modifiers.map(modifier => modifier.getText(sourceFile));
    }

    export function extractSyntax(
        node: TypeScript.Node,
        sourceFile: TypeScript.SourceFile,
        ignoreChildren?: boolean
    ): (Array<string>|undefined) {
        switch (node.kind) {
            case SyntaxKind.SyntaxList:
                return node
                    .getChildren(sourceFile)
                    .map(node => node.getText(sourceFile));
        }

        if (!ignoreChildren) {
            return Utilities.extractInChildren(node, sourceFile, extractSyntax);
        }

        return void 0;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default MemberUtilities;
