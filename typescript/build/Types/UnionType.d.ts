/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as T from './index';
import TS from 'typescript';
export declare class UnionType extends T.Type<TS.UnionTypeNode> {
    getChildren(): Array<T.Type>;
    toJSON(): UnionTypeJSON;
    toString(): string;
}
export interface UnionTypeJSON extends T.TypeJSON {
    kind: 'union';
}
export default UnionType;
