/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './';
import TS from 'typescript';

export class LiteralMember extends M.Member<(TS.LiteralTypeNode)> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): LiteralMemberJSON {

        const node = this.node;
        const superJSON = super.toJSON();

        return {
            children: superJSON.children,
            kind: 'literal',
            kindID: superJSON.kindID,
            literal: node.literal
        };
    }
}

export interface LiteralMemberJSON extends M.MemberJSON {
    kind: 'literal';
}

export default LiteralMember;
