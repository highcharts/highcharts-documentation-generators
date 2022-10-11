/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import Member from '../Member';
import ProjectFile from '../ProjectFile';
import TypeScript from 'typescript';
export declare class InterfaceMember extends Member {
    static parse(file: ProjectFile, node: TypeScript.Node): (InterfaceMember | undefined);
    protected constructor(file: ProjectFile, node: InterfaceMember.NodeType);
    readonly name: string;
    toJSON(_skipChildren?: boolean): InterfaceMember.JSON;
}
export interface InterfaceMember {
    readonly node: InterfaceMember.NodeType;
}
export declare namespace InterfaceMember {
    interface JSON extends Member.JSON {
        kind: 'interface';
        name: string;
    }
    type NodeType = (TypeScript.InterfaceDeclaration);
}
export default InterfaceMember;
