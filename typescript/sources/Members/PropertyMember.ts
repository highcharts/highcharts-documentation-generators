/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import JSONUtilities from '../JSONUtilities';
import * as M from './index';
import ModifiersUtilities from '../ModifiersUtilities';
import * as T from '../Types/index';
import TS from 'typescript';
import TypesUtilities from '../TypesUtilities';

export class PropertyMember extends M.Member<TS.PropertyDeclaration> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): PropertyMemberJSON {

        const node = this.node;
        const superJSON = super.toJSON();

        return {
            isNonOptional: typeof node.exclamationToken === 'undefined' ?
                undefined :
                true,
            isOptional: typeof node.questionToken === 'undefined' ?
                undefined :
                true,
            kind: 'property',
            kindID: superJSON.kindID,
            modifiers: ModifiersUtilities.getModifierArray(node.modifiers),
            types: JSONUtilities.toJSONArray(
                TypesUtilities.loadFromChildren(this.getChildNodes())
            )
        }
    }
}

export interface PropertyMemberJSON extends M.MemberJSON {
    children?: undefined;
    kind: 'property';
    isNonOptional?: boolean;
    isOptional?: boolean;
    modifiers: Array<string>;
    types: Array<T.TypeJSON>;
}

export default PropertyMember;
