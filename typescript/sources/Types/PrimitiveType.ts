/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as T from './index';
import TS from 'typescript';

export class PrimitiveType extends T.Type<TS.KeywordTypeNode> {

    /* *
     *
     *  Static Functions
     *
     * */

    public static isKeywordTypeNode(node: TS.Node): node is TS.KeywordTypeNode {

        switch (node.kind) {
            case TS.SyntaxKind.AnyKeyword:
            case TS.SyntaxKind.BigIntKeyword:
            case TS.SyntaxKind.BooleanKeyword:
            case TS.SyntaxKind.NeverKeyword:
            case TS.SyntaxKind.NullKeyword:
            case TS.SyntaxKind.NumberKeyword:
            case TS.SyntaxKind.ObjectKeyword:
            case TS.SyntaxKind.StringKeyword:
            case TS.SyntaxKind.SymbolKeyword:
            case TS.SyntaxKind.ThisKeyword:
            case TS.SyntaxKind.UndefinedKeyword:
            case TS.SyntaxKind.UnknownKeyword:
            case TS.SyntaxKind.VoidKeyword:
                return true;
        }

        return false;
    }
}

export default PrimitiveType;
