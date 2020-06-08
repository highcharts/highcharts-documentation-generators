/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as T from './index';
import TS from 'typescript';
export declare class PrimitiveType extends T.Type<TS.KeywordTypeNode> {
    static test(node: TS.Node): node is TS.KeywordTypeNode;
}
export default PrimitiveType;
