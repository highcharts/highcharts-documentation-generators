/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import Member from '../Member';
import ProjectFile from '../ProjectFile';
import TypeScript from 'typescript';
export declare class FunctionMember extends Member {
    static parse(file: ProjectFile, node: TypeScript.Node): (FunctionMember | undefined);
    protected constructor(file: ProjectFile, node: FunctionMember.NodeType);
    readonly name?: string;
    toJSON(_skipChildren?: boolean): FunctionMember.JSON;
}
export interface FunctionMember {
    readonly node: FunctionMember.NodeType;
}
export declare namespace FunctionMember {
    interface JSON extends Member.JSON {
        kind: 'function';
        name?: string;
    }
    type NodeType = (TypeScript.FunctionDeclaration | TypeScript.FunctionExpression);
}
export default FunctionMember;
