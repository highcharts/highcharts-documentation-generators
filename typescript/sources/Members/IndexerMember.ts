/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './';
import TS from 'typescript';

export class IndexerMember extends M.Member<TS.ComputedPropertyName> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): IndexerMemberJSON {

        const node = this.node;
        const superJSON = super.toJSON();

        return {
            children: superJSON.children,
            decorators: node.decorators,
            expression: node.expression,
            kind: 'indexer',
            kindID: superJSON.kindID,
            modifiers: node.modifiers,
        };
    }
}

export interface IndexerMemberJSON extends M.MemberJSON {
    kind: 'indexer';
}

export default IndexerMember;
