/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as T from './index';
import TS from 'typescript';
export declare class ReferenceType extends T.Type<TS.TypeReferenceType> {
    toJSON(): ReferenceTypeJSON;
}
export interface ReferenceTypeJSON extends T.TypeJSON {
    arguments: Array<T.TypeJSON>;
    children?: undefined;
    kind: 'reference';
}
export default ReferenceType;
