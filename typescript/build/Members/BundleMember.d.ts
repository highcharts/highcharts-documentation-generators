/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './Member';
import TS from 'typescript';
export declare class BundleMember extends M.Member<TS.Bundle> {
    toJSON(): BundleMemberJSON;
}
export interface BundleMemberJSON extends M.MemberJSON {
    kind: 'bundle';
}
export default BundleMember;
