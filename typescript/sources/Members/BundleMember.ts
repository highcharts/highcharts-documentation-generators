/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './';
import TS from 'typescript';

export class BundleMember extends M.Member<TS.Bundle> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): BundleMemberJSON {

        const superJSON = super.toJSON();

        return {
            children: (superJSON.children || []),
            kind: 'bundle',
            kindID: superJSON.kindID
        }
    }
}

export interface BundleMemberJSON extends M.MemberJSON {
    children: Array<M.MemberJSON>;
    kind: 'bundle';
}

export default BundleMember;
