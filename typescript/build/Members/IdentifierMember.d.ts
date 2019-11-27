/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './';
import TS from 'typescript';
export declare class IdentifierMember extends M.Member<TS.Identifier> {
    toJSON(): IdentifierMemberJSON;
}
export interface IdentifierMemberJSON extends M.MemberJSON {
    kind: 'identifier';
    name: string;
}
export default IdentifierMember;
