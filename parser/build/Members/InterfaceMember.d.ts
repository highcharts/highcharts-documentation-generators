/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import Member from '../Member';
import * as Members from '.';
import ProjectFile from '../ProjectFile';
import TypeScript from 'typescript';
export declare class InterfaceMember extends Member {
    static parse(file: ProjectFile, node: TypeScript.Node): (InterfaceMember | undefined);
    protected constructor(file: ProjectFile, node: InterfaceMember.NodeType);
    readonly name: string;
    getChildren(): InterfaceMember.Children;
    getGeneric(): (Array<string> | undefined);
    toJSON(skipChildren?: boolean): InterfaceMember.JSON;
}
export interface InterfaceMember {
    readonly node: InterfaceMember.NodeType;
}
export declare namespace InterfaceMember {
    type Children = Array<(Members.FunctionMember | Members.PropertyMember)>;
    interface JSON extends Member.JSON {
        generics?: Array<string>;
        kind: 'interface';
        name: string;
    }
    type NodeType = (TypeScript.InterfaceDeclaration);
}
export default InterfaceMember;
