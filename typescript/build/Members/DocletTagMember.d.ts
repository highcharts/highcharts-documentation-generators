/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './';
import TS from 'typescript';
export declare class DocletTagMember extends M.Member<TS.JSDocTag> {
    toJSON(): DocletTagMemberJSON;
}
export interface DocletTagMemberJSON extends M.MemberJSON {
    children?: undefined;
    kind: 'doclettag';
}
export default DocletTagMember;
