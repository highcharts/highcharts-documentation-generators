/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import TS from 'typescript';
import Member from '../Member';

export class BlockMember extends Member<(TS.Block|TS.ModuleBlock)> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): (object|undefined) {

        const node = this.node;

        if (typeof node === 'undefined') {
            return;
        }

        return {
            children: this.getChildren(),
            kind: 'block'
        }
    }
}

export default BlockMember;
