/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './';
import TS from 'typescript';
export declare class LiteralMember extends M.Member<(TS.LiteralTypeNode)> {
    toJSON(): LiteralMemberJSON;
}
export interface LiteralMemberJSON extends M.MemberJSON {
    kind: 'literal';
}
export default LiteralMember;
