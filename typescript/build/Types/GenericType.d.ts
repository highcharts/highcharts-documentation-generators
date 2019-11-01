/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as T from './index';
import TS from 'typescript';
export declare class GenericType extends T.Type<TS.TypeReferenceType> {
    toJSON(): GenericTypeJSON;
}
export interface GenericTypeJSON extends T.TypeJSON {
    arguments: Array<T.TypeJSON>;
    children?: undefined;
    kind: 'generic';
}
export default GenericType;
