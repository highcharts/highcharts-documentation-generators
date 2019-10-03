/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as T from './Types/index';
import TS from 'typescript';
export declare class TypesUtilities {
    static loadFromChildren(nodeChildren: Array<TS.Node>): Array<T.Type>;
    static loadFromTypeNode(typeNode: TS.TypeNode): T.Type;
    private constructor();
}
export default TypesUtilities;
