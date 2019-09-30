/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import TS from 'typescript';

export abstract class Member {

    /* *
     *
     *  Functions
     *
     * */

    public abstract loadNode(node: TS.Node, isTest?: boolean): boolean;

    public supportsNode(node: TS.Node): boolean {
        return this.loadNode(node, true);
    }
}

export default Member;
