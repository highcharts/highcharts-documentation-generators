/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './';
import TS from 'typescript';
export declare class FunctionMember extends M.Member<(TS.FunctionDeclaration | TS.FunctionExpression | TS.FunctionTypeNode)> {
    getParameterNodes(): Array<TS.ParameterDeclaration>;
    getParameters(): Array<M.ParameterMember>;
    getParametersJSON(): Array<M.ParameterMemberJSON>;
    toJSON(): FunctionMemberJSON;
}
export interface FunctionMemberJSON extends M.MemberJSON {
    kind: 'function';
    name: string;
}
export default FunctionMember;
