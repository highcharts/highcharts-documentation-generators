/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './';
import TS from 'typescript';

export class IdentifierMember extends M.Member<TS.Identifier> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): IdentifierMemberJSON {

        const node = this.node;
        const superJSON = super.toJSON();

        return {
            children: superJSON.children,
            kind: 'identifier',
            kindID: superJSON.kindID,
            modifiers: node.modifiers,
            name: node.escapedText.toString()
        };
    }
}

export interface IdentifierMemberJSON extends M.MemberJSON {
    kind: 'identifier';
    name: string;
}

export default IdentifierMember;
