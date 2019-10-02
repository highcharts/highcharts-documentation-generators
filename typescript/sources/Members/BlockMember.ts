/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './Member';
import TS from 'typescript';

export class BlockMember extends M.Member<(TS.Block|TS.ModuleBlock)> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): BlockMemberJSON {

        const superJSON = super.toJSON();

        return {
            children: superJSON.children,
            kind: 'block',
            kindID: superJSON.kindID
        }
    }
}

export interface BlockMemberJSON extends M.MemberJSON {
    kind: 'block';
}

export default BlockMember;
