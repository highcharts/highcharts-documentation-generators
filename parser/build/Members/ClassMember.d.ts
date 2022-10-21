/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as TypeScript from 'typescript';
import Member from '../Member';
import ProjectFile from '../ProjectFile';
export declare class ClassMember extends Member {
    static parse(file: ProjectFile, node: TypeScript.Node): (ClassMember | undefined);
    protected constructor(file: ProjectFile, node: ClassMember.NodeType);
    readonly name: string;
    getChildren(): Array<Member>;
    getGeneric(): (Array<string> | undefined);
    toJSON(): ClassMember.JSON;
}
export interface ClassMember {
    readonly node: ClassMember.NodeType;
}
export declare namespace ClassMember {
    interface JSON extends Member.JSON {
        generics?: Array<string>;
        kind: 'class';
        name: string;
    }
    type NodeType = TypeScript.ClassLikeDeclaration;
}
export default ClassMember;
