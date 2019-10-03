/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './Member';
import TS from 'typescript';

export class ModuleMember extends M.Member<TS.ModuleDeclaration> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): ModuleMemberJSON {

        const superJSON = super.toJSON();

        return {
            children: (superJSON.children || []),
            kind: 'module',
            kindID: superJSON.kindID,
            name: this.node.name.text
        };
    }
}

export interface ModuleMemberJSON extends M.MemberJSON {
    children: Array<M.MemberJSON>;
    kind: 'module';
    name: string;
}

export default ModuleMember;
