/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as T from './Types/index';
import TS from 'typescript';
export declare class TypesUtilities {
    static loadFromNode(node: TS.Node): (T.Type | undefined);
    static loadFromTypeNode(typeNode: TS.TypeNode): T.Type;
    private constructor();
}
export default TypesUtilities;
