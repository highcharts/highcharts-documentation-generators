/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './';
import TS from 'typescript';

export class ClassMember extends M.Member<(TS.ClassDeclaration|TS.ClassExpression)> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): ClassMemberJSON {

        const node = this.node;
        const superJSON = super.toJSON();

        return {
            children: (superJSON.children || []),
            kind: 'class',
            kindID: superJSON.kindID,
            name: (node.name && node.name.text || '')
        };
    }
}

export interface ClassMemberJSON extends M.MemberJSON {
    children: Array<M.MemberJSON>;
    kind: 'class';
    name: string;
}

export default ClassMember;
