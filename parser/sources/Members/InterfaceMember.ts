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

export class InterfaceMember extends Member {

    /* *
     *
     *  Static Functions
     *
     * */

    public static parse(
        file: ProjectFile,
        node: TypeScript.Node
    ): (InterfaceMember|undefined) {

        if (!TypeScript.isInterfaceDeclaration(node)) {
            return;
        }

        return new InterfaceMember(file, node);
    }


    /* *
     *
     *  Constructor
     *
     * */

    protected constructor(
        file: ProjectFile,
        node: InterfaceMember.NodeType
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

    public getGeneric(): (Array<string>|undefined) {
        const interfaceMember = this,
            fileNode = interfaceMember.file.node,
            typeParameters = interfaceMember.node.typeParameters;

        if (!typeParameters) {
            return;
        }

        return typeParameters.map(parameter => parameter.getText(fileNode));
    }

    public toJSON(): InterfaceMember.JSON {
        const interfaceMember = this,
            children = interfaceMember
                .getChildren()
                .map(child => child.toJSON()),
            comment = interfaceMember.getComment(),
            generics = interfaceMember.getGeneric(),
            meta = interfaceMember.getMeta(),
            name = interfaceMember.name;

        return {
            kind: 'interface',
            name,
            generics,
            comment,
            meta,
            children
        };
    }

}

/* *
 *
 *  Class Prototype
 *
 * */

export interface InterfaceMember {
    readonly node: InterfaceMember.NodeType;
}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace InterfaceMember {

    /* *
     *
     *  Declarations
     *
     * */

    export interface JSON extends Member.JSON {
        generics?: Array<string>;
        kind: 'interface';
        name: string;
    }

    export type NodeType = (
        TypeScript.InterfaceDeclaration
    );

}

/* *
 *
 *  Registry
 *
 * */

Member.register(InterfaceMember);

/* *
 *
 *  Default Export
 *
 * */

export default InterfaceMember;
