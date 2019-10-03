/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import JSONUtilities from '../JSONUtilities';
import * as T from './index';
import TS from 'typescript';
import TypesUtilities from '../TypesUtilities';

export class ReferenceType extends T.Type<TS.TypeReferenceType> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): ReferenceTypeJSON {

        const typeNode = this.typeNode;
        const sourceFile = this.sourceFile;
        const superJSON = super.toJSON();

        return {
            arguments: JSONUtilities.toJSONArray(
                TypesUtilities.loadFromChildren(
                    sourceFile,
                    (typeNode.typeArguments || [])
                )
            ),
            kind: 'reference',
            kindID: superJSON.kindID
        };
    }

}

export interface ReferenceTypeJSON extends T.TypeJSON {
    arguments: Array<T.TypeJSON>;
    children?: undefined;
    kind: 'reference';
}

export default ReferenceType;
