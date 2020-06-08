/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import JSONUtilities from '../JSONUtilities';
import * as T from './index';
import TS from 'typescript';
import TypesUtilities from '../TypesUtilities';

export class ArrayType extends T.Type<TS.ArrayTypeNode> {

    /* *
     *
     *  Static Functions
     *
     * */

    public static test(node: TS.Node): node is TS.ArrayTypeNode {
        return TS.isArrayTypeNode(node);
    }

    /* *
     *
     *  Functions
     *
     * */

    public getChildren(): Array<T.Type> {
        return [
            TypesUtilities.loadFromTypeNode(
                this.sourceFile,
                this.typeNode.elementType
            )
        ];
    }

    public getChildrenJSON(): Array<T.TypeJSON> {
        return JSONUtilities.toJSONArray(this.getChildren());
    }

    public toJSON(): ArrayTypeJSON {

        const superJSON = super.toJSON();

        return {
            genericArguments: this.getChildrenJSON(),
            kind: 'array',
            kindID: superJSON.kindID,
            name: superJSON.name
        }
    }
}

export interface ArrayTypeJSON extends T.TypeJSON {
    children?: undefined;
    genericArguments: Array<T.TypeJSON>;
    kind: 'array';
}

export default ArrayType;
