/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './';
import TS from 'typescript';
export declare class IndexerMember extends M.Member<TS.ComputedPropertyName> {
    toJSON(): IndexerMemberJSON;
}
export interface IndexerMemberJSON extends M.MemberJSON {
    kind: 'indexer';
}
export default IndexerMember;
