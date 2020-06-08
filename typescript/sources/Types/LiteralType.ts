/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as JS from '../JSON/index';
import * as T from './index';
import TS, { LiteralTypeNode } from 'typescript';

export class LiteralType extends T.Type<TS.LiteralTypeNode> {

    /* *
     *
     *  Static Functions
     *
     * */

    public static test(node: TS.Node): node is TS.LiteralTypeNode {
        return TS.isLiteralTypeNode(node);
    }

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): LiteralTypeJSON {

        const typeNode = this.typeNode;

        return {
            kind: 'literal',
            kindID: typeNode.kind,
            name: this.toString(),
            unsupportedNode: this.isSupported ?
                undefined :
                typeNode
        };
    }

}

export interface LiteralTypeJSON extends JS.JSONObject {
    kind: 'literal';
    kindID: TS.SyntaxKind;
    name?: string;
    unsupportedNode?: TS.TypeNode;
}

export default LiteralTypeNode;
