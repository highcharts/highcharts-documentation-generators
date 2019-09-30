/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import TS from 'typescript';
import Member from './Member';
export declare class NamespaceMember extends Member {
    constructor();
    _node: (TS.Block | TS.ModuleBlock | TS.SourceFile | undefined);
    loadNode(node: TS.Node, isTest?: boolean): boolean;
}
export default NamespaceMember;
