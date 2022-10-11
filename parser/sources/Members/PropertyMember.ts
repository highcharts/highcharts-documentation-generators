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

export class PropertyMember extends Member {

    /* *
     *
     *  Static Functions
     *
     * */

    public static parse(
        file: ProjectFile,
        node: TypeScript.Node
    ): (PropertyMember|undefined) {

        if (
            !TypeScript.isPropertyAssignment(node) &&
            !TypeScript.isPropertyDeclaration(node) &&
            !TypeScript.isPropertySignature(node)
        ) {
            return;
        }

        return new PropertyMember(file, node);
    }

    /* *
     *
     *  Constructor
     *
     * */

    protected constructor(
        file: ProjectFile,
        node: PropertyMember.NodeType
    ) {
        super(file, node);
        this.name = node.name.getText(file.node);
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

    public toJSON(
        _skipChildren?: boolean
    ): PropertyMember.JSON {
        const functionMember = this,
            name = functionMember.name;

        return {
            ...super.toJSON(true),
            kind: 'property',
            name
        };
    }

}

/* *
 *
 *  Class Prototype
 *
 * */

export interface PropertyMember {
    readonly node: PropertyMember.NodeType;
}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace PropertyMember {

    /* *
     *
     *  Declarations
     *
     * */

    export interface JSON extends Member.JSON {
        kind: 'property';
        name: string;
    }

    export type NodeType = (
        TypeScript.PropertyAssignment |
        TypeScript.PropertyDeclaration |
        TypeScript.PropertySignature
    );

}

/* *
 *
 *  Registry
 *
 * */

Member.register(PropertyMember);

/* *
 *
 *  Default Export
 *
 * */

export default PropertyMember;
