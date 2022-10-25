/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as TypeScript from 'typescript';
import Member from '../Member';
import ProjectFile from '../ProjectFile';
export declare class InterfaceMember extends Member {
    static parse(file: ProjectFile, node: TypeScript.Node): (InterfaceMember | undefined);
    protected constructor(file: ProjectFile, node: InterfaceMember.NodeType);
    readonly name: string;
    getChildren(): Array<Member>;
    getGenerics(): (Array<string> | undefined);
    getInheritances(): (Array<string> | undefined);
    toJSON(): InterfaceMember.JSON;
}
export interface InterfaceMember {
    readonly node: InterfaceMember.NodeType;
}
export declare namespace InterfaceMember {
    interface JSON extends Member.JSON {
        generics?: Array<string>;
        inheritances?: Array<string>;
        kind: 'interface';
        name: string;
    }
    type NodeType = (TypeScript.InterfaceDeclaration);
}
export default InterfaceMember;
