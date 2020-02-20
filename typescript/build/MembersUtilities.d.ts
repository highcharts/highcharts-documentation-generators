/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './Members/index';
import TS from 'typescript';
export declare class MembersUtilities {
    private static memberCache;
    private static nodeCache;
    static loadFromCache(node: TS.Node): (M.Member | undefined);
    static loadFromNode(sourceFile: TS.SourceFile, node: TS.Node): (M.Member | undefined);
    static loadFromNodesChildren(sourceFile: TS.SourceFile, node: TS.Node): (M.Member | undefined);
    static loadNodeChildren(sourceFile: TS.SourceFile, nodeChildren: Array<TS.Node>): Array<M.Member>;
    static saveToCache(node: TS.Node, member: M.Member): void;
    private constructor();
}
export default MembersUtilities;
