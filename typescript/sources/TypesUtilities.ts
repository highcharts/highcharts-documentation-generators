/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as T from './Types/index';
import TS from 'typescript';

export class TypesUtilities {

    /* *
     *
     *  Static Functions
     *
     * */

    public static loadFromChildren(
        nodeChildren: Array<TS.Node>
    ): Array<T.Type> {

        const typeChildren: Array<T.Type> = [];

        for (let nodeChild of nodeChildren) {
            if (TS.isTypeNode(nodeChild)) {
                typeChildren.push(TypesUtilities.loadFromTypeNode(nodeChild));
            }
        }

        return typeChildren;
    }

    public static loadFromTypeNode(typeNode: TS.TypeNode): T.Type {

        if (TS.isUnionTypeNode(typeNode)) {
            return new T.UnionType(typeNode);
        }

        return new T.Type(typeNode, true);
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor() {};
}

export default TypesUtilities;
