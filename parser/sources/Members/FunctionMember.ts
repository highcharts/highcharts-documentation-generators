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
            !TypeScript.isFunctionExpression(node)
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

        if (node.name) {
            this.name = node.name.getText(file.node);
        }
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly name?: string;

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(
        _skipChildren?: boolean
    ): FunctionMember.JSON {
        const functionMember = this,
            name = functionMember.name;

        return {
            ...super.toJSON(true),
            kind: 'function',
            name
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
        name?: string;
    }

    export type NodeType = (
        TypeScript.FunctionDeclaration |
        TypeScript.FunctionExpression
    );

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
