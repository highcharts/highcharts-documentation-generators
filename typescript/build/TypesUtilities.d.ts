/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as T from './Types/index';
import TS from 'typescript';
export declare class TypesUtilities {
    static loadFromChildren(sourceFile: TS.SourceFile, nodeChildren: (Array<TS.Node> | TS.NodeArray<TS.TypeNode>)): Array<T.Type>;
    static loadFromTypeNode(sourceFile: TS.SourceFile, typeNode: TS.TypeNode): T.Type;
    private constructor();
}
export default TypesUtilities;
