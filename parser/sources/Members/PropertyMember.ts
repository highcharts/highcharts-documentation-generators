/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as TypeScript from 'typescript';

import Member from '../Member';
import ProjectFile from '../ProjectFile';

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

    public getType(): string {
        const propertyMember = this;
        const fileNode = propertyMember.file.node;
        const propertyNode = propertyMember.node;
        const type = propertyNode.type;

        return (
            type ?
                type.getText(fileNode) :
                '*'
        );
    }

    public toJSON(): PropertyMember.JSON {
        const propertyMember = this;
        const commentTags = propertyMember.getCommentTags();
        const meta = propertyMember.getMeta();
        const name = propertyMember.name;
        const type = propertyMember.getType();

        return {
            kind: 'property',
            name,
            type,
            commentTags,
            meta
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
        type: string;
    }

    export type NodeType = (
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
