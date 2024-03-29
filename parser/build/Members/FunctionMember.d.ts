/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as TypeScript from 'typescript';
import Member from '../Member';
import ProjectFile from '../ProjectFile';
export declare class FunctionMember extends Member {
    static parse(file: ProjectFile, node: TypeScript.Node): (FunctionMember | undefined);
    protected constructor(file: ProjectFile, node: FunctionMember.NodeType);
    readonly name: string;
    getGeneric(): (Array<string> | undefined);
    getParameters(): (FunctionMember.Parameters | undefined);
    getResult(): (string | undefined);
    toJSON(): FunctionMember.JSON;
}
export interface FunctionMember {
    readonly node: FunctionMember.NodeType;
}
export declare namespace FunctionMember {
    interface JSON extends Member.JSON {
        kind: 'function';
        name: string;
        parameters?: Parameters;
        result?: string;
    }
    type NodeType = (TypeScript.ConstructorDeclaration | TypeScript.ConstructSignatureDeclaration | TypeScript.FunctionDeclaration | TypeScript.FunctionExpression | TypeScript.MethodDeclaration | TypeScript.MethodSignature);
    type Parameters = Record<string, string>;
}
export default FunctionMember;
