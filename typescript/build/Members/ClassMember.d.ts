/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './';
import TS from 'typescript';
export declare class ClassMember extends M.Member<(TS.ClassDeclaration | TS.ClassExpression)> {
    toJSON(): ClassMemberJSON;
}
export interface ClassMemberJSON extends M.MemberJSON {
    children: Array<M.MemberJSON>;
    kind: 'class';
    name: string;
}
export default ClassMember;
