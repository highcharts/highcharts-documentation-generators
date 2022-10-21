/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as TypeScript from 'typescript';
import Member from '../Member';
import ProjectFile from '../ProjectFile';
export declare class ModuleMember extends Member {
    static parse(file: ProjectFile, node: TypeScript.Node): (ModuleMember | undefined);
    protected constructor(file: ProjectFile, node: ModuleMember.NodeType);
    readonly name: string;
    getChildren(): Array<Member>;
    toJSON(): ModuleMember.JSON;
}
export interface ModuleMember {
    readonly node: ModuleMember.NodeType;
}
export declare namespace ModuleMember {
    interface JSON extends Member.JSON {
        kind: 'module';
        name: string;
    }
    type NodeType = TypeScript.ModuleDeclaration;
}
export default ModuleMember;
