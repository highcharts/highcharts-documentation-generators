/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as TypeScript from 'typescript';
import Member from '../Member';
import ProjectFile from '../ProjectFile';
export declare class PropertyMember extends Member {
    static parse(file: ProjectFile, node: TypeScript.Node): (PropertyMember | undefined);
    protected constructor(file: ProjectFile, node: PropertyMember.NodeType);
    readonly name: string;
    getType(): string;
    toJSON(): PropertyMember.JSON;
}
export interface PropertyMember {
    readonly node: PropertyMember.NodeType;
}
export declare namespace PropertyMember {
    interface JSON extends Member.JSON {
        kind: 'property';
        name: string;
        type: string;
    }
    type NodeType = (TypeScript.PropertyDeclaration | TypeScript.PropertySignature);
}
export default PropertyMember;
