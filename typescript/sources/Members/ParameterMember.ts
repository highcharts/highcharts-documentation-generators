/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './';
import TS from 'typescript';
import TypesUtilities from '../TypesUtilities';

export class ParameterMember extends M.Member<TS.ParameterDeclaration> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): ParameterMemberJSON {

        const node = this.node;
        const sourceFile = this.sourceFile;
        const superJSON = super.toJSON();

        return {
            kind: 'parameter',
            kindID: superJSON.kindID,
            name: node.name,
            type: TypesUtilities.loadFromTypeNode(sourceFile, node.type)
        };
    }
}

export interface ParameterMemberJSON extends M.MemberJSON {
    children?: undefined;
    kind: 'parameter';
}

export default ParameterMember;
