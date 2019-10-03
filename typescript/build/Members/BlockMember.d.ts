/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './Member';
import TS from 'typescript';
export declare class BlockMember extends M.Member<(TS.Block | TS.ModuleBlock)> {
    toJSON(): BlockMemberJSON;
}
export interface BlockMemberJSON extends M.MemberJSON {
    children: Array<M.MemberJSON>;
    kind: 'block';
}
export default BlockMember;
