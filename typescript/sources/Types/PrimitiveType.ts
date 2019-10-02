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
     *  Functions
     *
     * */

    public toString(): string {
        switch (this.typeNode.kind) {
            default:
            case TS.SyntaxKind.AnyKeyword:
                return 'any';
            case TS.SyntaxKind.BigIntKeyword:
                return 'bigint';
            case TS.SyntaxKind.BooleanKeyword:
                return 'boolean';
            case TS.SyntaxKind.NeverKeyword:
                return 'never';
            case TS.SyntaxKind.NullKeyword:
                return 'null';
            case TS.SyntaxKind.NumberKeyword:
                return 'number';
            case TS.SyntaxKind.ObjectKeyword:
                return 'object';
            case TS.SyntaxKind.StringKeyword:
                return 'string';
            case TS.SyntaxKind.SymbolKeyword:
                return 'symbol';
            case TS.SyntaxKind.ThisKeyword:
                return 'this';
            case TS.SyntaxKind.UndefinedKeyword:
                return 'undefined';
            case TS.SyntaxKind.UnknownKeyword:
                return 'unknown';
            case TS.SyntaxKind.VoidKeyword:
                return 'void';
        }
    }
}

export default PrimitiveType;
