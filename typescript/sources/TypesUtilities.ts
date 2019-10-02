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

    public static loadFromNode(node: TS.Node): (T.Type|undefined) {

        if (TS.isTypeNode(node)) {
            return TypesUtilities.loadFromTypeNode(node);
        }

        return;
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
