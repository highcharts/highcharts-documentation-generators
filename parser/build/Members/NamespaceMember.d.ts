/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as TypeScript from 'typescript';
import Member from '../Member';
import ProjectFile from '../ProjectFile';
export declare class NamespaceMember extends Member {
    static parse(file: ProjectFile, node: TypeScript.Node): (NamespaceMember | undefined);
    protected constructor(file: ProjectFile, node: NamespaceMember.NodeType);
    readonly name: string;
    getChildren(): Array<Member>;
    toJSON(): NamespaceMember.JSON;
}
export interface NamespaceMember {
    readonly node: NamespaceMember.NodeType;
}
export declare namespace NamespaceMember {
    interface JSON extends Member.JSON {
        kind: 'namespace';
        name: string;
    }
    type NodeType = (TypeScript.NamespaceDeclaration);
}
export default NamespaceMember;
