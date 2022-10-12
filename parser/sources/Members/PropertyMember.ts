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
        const propertyMember = this,
            fileNode = propertyMember.file.node,
            propertyNode = propertyMember.node,
            type = propertyNode.type;

        return (
            type ?
                type.getText(fileNode) :
                '*'
        );
    }

    public toJSON(): PropertyMember.JSON {
        const propertyMember = this,
            comment = propertyMember.getComment(),
            meta = propertyMember.getMeta(),
            name = propertyMember.name,
            type = propertyMember.getType();

        return {
            kind: 'property',
            name,
            type,
            comment,
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
