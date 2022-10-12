/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import Member from '../Member';
import * as Members from '.';
import ProjectFile from '../ProjectFile';
import TypeScript from 'typescript';

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

    public getChildren(): InterfaceMember.Children {
        const interfaceMember = this,
            projectFile = interfaceMember.file,
            interfaceNode = interfaceMember.node;

        return Member
            .parseChildren(projectFile, interfaceNode)
            .filter(member => (
                member instanceof Members.FunctionMember ||
                member instanceof Members.PropertyMember
            )) as InterfaceMember.Children;
    }

    public getGeneric(): (Array<string>|undefined) {
        const interfaceMember = this,
            fileNode = interfaceMember.file.node,
            typeParameters = interfaceMember.node.typeParameters;

        if (!typeParameters) {
            return;
        }

        return typeParameters.map(parameter => parameter.getText(fileNode));
    }

    public toJSON(
        skipChildren?: boolean
    ): InterfaceMember.JSON {
        const interfaceMember = this,
            name = interfaceMember.name,
            children = (
                skipChildren ?
                    void 0 :
                    interfaceMember
                        .getChildren()
                        .map(child => child.toJSON())
            ),
            comment = interfaceMember.getComment(),
            generics = interfaceMember.getGeneric();

        return {
            kind: 'interface',
            name,
            generics,
            comment,
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

    export type Children = Array<(
        Members.FunctionMember |
        Members.PropertyMember
    )>;

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
