/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './';
import TS from 'typescript';
export declare class ParameterMember extends M.Member<TS.ParameterDeclaration> {
    toJSON(): ParameterMemberJSON;
}
export interface ParameterMemberJSON extends M.MemberJSON {
    children?: undefined;
    kind: 'parameter';
}
export default ParameterMember;
