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

    public getChildren(): Array<T.Type> {
        return TypesUtilities.loadFromChildren(
            this.sourceFile,
            (this.typeNode.typeArguments || [])
        );
    }

    public getChildrenJSON(): (Array<T.TypeJSON>|undefined) {

        const children = this.getChildren();

        if (children.length === 0) {
            return undefined;
        }

        return JSONUtilities.toJSONArray(children);
    }

    public toJSON(): ReferenceTypeJSON {

        const superJSON = super.toJSON();

        return {
            genericArguments: this.getChildrenJSON(),
            kind: 'reference',
            kindID: superJSON.kindID,
            name: superJSON.name
        };
    }

}

export interface ReferenceTypeJSON extends T.TypeJSON {
    children?: undefined;
    genericArguments?: Array<T.TypeJSON>;
    kind: 'reference';
}

export default ReferenceType;
