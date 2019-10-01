/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import TS from 'typescript';
import Member from '../Member';
export declare class ModuleMember extends Member<(TS.ModuleDeclaration | TS.SourceFile)> {
    toJSON(): (object | undefined);
}
export default ModuleMember;
