/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as T from './index';
import TS from 'typescript';
export declare class ReferenceType extends T.Type<TS.TypeReferenceType> {
    getChildren(): Array<T.Type>;
    getChildrenJSON(): (Array<T.TypeJSON> | undefined);
    toJSON(): ReferenceTypeJSON;
}
export interface ReferenceTypeJSON extends T.TypeJSON {
    children?: undefined;
    genericArguments?: Array<T.TypeJSON>;
    kind: 'reference';
}
export default ReferenceType;
