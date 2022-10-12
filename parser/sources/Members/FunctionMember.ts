/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import Member from '../Member';
import ProjectFile from '../ProjectFile';
import TypeScript from 'typescript';

/* *
 *
 *  Class
 *
 * */

export class FunctionMember extends Member {

    /* *
     *
     *  Static Functions
     *
     * */

    public static parse(
        file: ProjectFile,
        node: TypeScript.Node
    ): (FunctionMember|undefined) {

        if (
            !TypeScript.isFunctionDeclaration(node) &&
            !TypeScript.isFunctionExpression(node) &&
            !TypeScript.isConstructorDeclaration(node) &&
            !TypeScript.isConstructSignatureDeclaration(node) ||
            !node.name
        ) {
            return;
        }

        return new FunctionMember(file, node);
    }

    /* *
     *
     *  Constructor
     *
     * */

    protected constructor(
        file: ProjectFile,
        node: FunctionMember.NodeType
    ) {
        super(file, node);
        this.name = node.name && node.name.getText(file.node) || '';
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly name: string;

    /* *
     *
     *  Functions
     *
     * */

    public getGeneric(): (Array<string>|undefined) {
        const functionMember = this,
            fileNode = functionMember.file.node,
            typeParameters = functionMember.node.typeParameters;

        if (!typeParameters) {
            return;
        }

        return typeParameters.map(parameter => parameter.getText(fileNode));
    }

    public getParameters(): (FunctionMember.Parameters|undefined) {
        const functionMember = this,
            fileNode = functionMember.file.node,
            functionNode = functionMember.node,
            functionParameters = functionNode.parameters;

        if (!functionParameters.length) {
            return;
        }

        let name: string,
            parameters: FunctionMember.Parameters = {};

        for (const parameter of functionParameters) {
            name = (
                parameter.name.getText(fileNode) +
                (parameter.questionToken && '?')
            );

            parameters[name] = (
                parameter.type ?
                    parameter.type.getText(fileNode) :
                    '*'
            );
        }

        return parameters;
    }

    public getResult(): (string|undefined) {
        const functionMember = this,
            fileNode = functionMember.file.node,
            functionNode = functionMember.node,
            functionType = functionNode.type;

        if (!functionType) {
            return;
        }

        const result = functionType.getText(fileNode);

        if (result === 'void') {
            return;
        }

        return result;
    }

    public toJSON(): FunctionMember.JSON {
        const functionMember = this,
            meta = functionMember.getMeta(),
            name = functionMember.name,
            parameters = functionMember.getParameters(),
            result = functionMember.getResult();

        return {
            kind: 'function',
            name,
            parameters,
            result,
            meta
        };
    }

}

/* *
 *
 *  Class Prototype
 *
 * */

export interface FunctionMember {
    readonly node: FunctionMember.NodeType;
}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace FunctionMember {

    /* *
     *
     *  Declarations
     *
     * */

    export interface JSON extends Member.JSON {
        kind: 'function';
        name: string;
        parameters?: Parameters;
        result?: string;
    }

    export type NodeType = (
        TypeScript.ConstructorDeclaration |
        TypeScript.ConstructSignatureDeclaration |
        TypeScript.FunctionDeclaration |
        TypeScript.FunctionExpression
    );

    export type Parameters = Record<string, string>;

}

/* *
 *
 *  Registry
 *
 * */

Member.register(FunctionMember);

/* *
 *
 *  Default Export
 *
 * */

export default FunctionMember;
