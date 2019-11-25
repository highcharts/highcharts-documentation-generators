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

        const superJSON = super.toJSON();
        const thisNode = this.node;

        return {
            children: superJSON.children,
            kind: 'literal',
            kindID: superJSON.kindID,
            literal: thisNode.literal
        };
    }
}

export interface LiteralMemberJSON extends M.MemberJSON {
    kind: 'literal';
}

export default LiteralMember;
