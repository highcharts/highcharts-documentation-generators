/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

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
        const sourceFile = this.sourceFile;
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
            name: node.name.getText(sourceFile),
            type: TypesUtilities.loadFromTypeNode(
                sourceFile,
                (
                    node.type ||
                    TS.createKeywordTypeNode(TS.SyntaxKind.UndefinedKeyword)
                )
            ).toJSON()
        }
    }
}

export interface PropertyMemberJSON extends M.MemberJSON {
    children?: undefined;
    kind: 'property';
    isNonOptional?: boolean;
    isOptional?: boolean;
    modifiers: Array<string>;
    name: string;
    type: T.TypeJSON;
}

export default PropertyMember;
