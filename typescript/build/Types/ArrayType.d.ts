/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as T from './index';
import TS from 'typescript';
export declare class ArrayType extends T.Type<TS.ArrayTypeNode> {
    getChildren(): Array<T.Type>;
    getChildrenJSON(): Array<T.TypeJSON>;
    toJSON(): ArrayTypeJSON;
}
export interface ArrayTypeJSON extends T.TypeJSON {
    children?: undefined;
    genericArguments: Array<T.TypeJSON>;
    kind: 'array';
}
export default ArrayType;
