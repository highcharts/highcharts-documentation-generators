/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import TS from 'typescript';
import Member from './Member';

export class NamespaceMember extends Member {

    /* *
     *
     *  Constructor
     *
     * */

    public constructor () {
        super();
    }

    /* *
     *
     *  Properties
     *
     * */

    _node: (TS.Block|TS.ModuleBlock|TS.SourceFile|undefined);


    /* *
     *
     *  Functions
     *
     * */

    public loadNode(node: TS.Node, isTest: boolean = false): boolean {
        if (!TS.isBlock(node) &&
            !TS.isModuleBlock(node) &&
            !TS.isSourceFile(node)
        ) {
            return false;
        }

        if (isTest === false) {
            this._node = node;
        }

        return true;
    }
}

export default NamespaceMember;
