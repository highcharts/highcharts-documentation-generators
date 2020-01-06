/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './';
import TS from 'typescript';
export declare class SyntaxMember extends M.Member<TS.SyntaxList> {
    toJSON(): SyntaxMemberJSON;
}
export interface SyntaxMemberJSON extends M.MemberJSON {
    kind: 'syntax';
}
export default DocletMember;
