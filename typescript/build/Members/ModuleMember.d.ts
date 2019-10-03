/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './Member';
import TS from 'typescript';
export declare class ModuleMember extends M.Member<TS.ModuleDeclaration> {
    toJSON(): ModuleMemberJSON;
}
export interface ModuleMemberJSON extends M.MemberJSON {
    children: Array<M.MemberJSON>;
    kind: 'module';
    name: string;
}
export default ModuleMember;
