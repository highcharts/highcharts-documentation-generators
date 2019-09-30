/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import TS from 'typescript';
import Member from './Member';
import * as Members from './Members/index';

export class MemberUtilities {

    /* *
     *
     *  Static Functions
     *
     * */

    public static load(node: TS.Node): (Member|undefined) {

        if (TS.isModuleDeclaration(node) || TS.isSourceFile(node)) {
            return new Members.ModuleMember(node);
        }

        if (TS.isBlock(node) || TS.isModuleBlock(node)) {
            return new Members.BlockMember(node);
        }

        return;
    }
}

export default MemberUtilities;
