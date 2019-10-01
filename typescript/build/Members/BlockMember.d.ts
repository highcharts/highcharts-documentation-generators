/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import TS from 'typescript';
import Member from '../Member';
export declare class BlockMember extends Member<(TS.Block | TS.ModuleBlock)> {
    toJSON(): (object | undefined);
}
export default BlockMember;
