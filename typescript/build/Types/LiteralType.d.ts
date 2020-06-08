/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as JS from '../JSON/index';
import * as T from './index';
import TS, { LiteralTypeNode } from 'typescript';
export declare class LiteralType extends T.Type<TS.LiteralTypeNode> {
    static test(node: TS.Node): node is TS.LiteralTypeNode;
    toJSON(): LiteralTypeJSON;
}
export interface LiteralTypeJSON extends JS.JSONObject {
    kind: 'literal';
    kindID: TS.SyntaxKind;
    name?: string;
    unsupportedNode?: TS.TypeNode;
}
export default LiteralTypeNode;
