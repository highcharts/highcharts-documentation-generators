/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as TypeScript from 'typescript';

import Member from '../Member';
import ProjectFile from '../ProjectFile';
import U from '../Utilities';

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

    public getChildren(): Array<Member> {
        const interfaceMember = this;
        const file = interfaceMember.file;
        const children: Array<Member> = [];

        let child: (Member|undefined);

        for (const member of interfaceMember.node.members) {
            child = Member.parse(file, member);

            if (child) {
                children.push(child);
            }
        }

        return children;
    }

    public getGenerics(): (Array<string>|undefined) {
        const interfaceMember = this;
        const fileNode = interfaceMember.file.node;
        const typeParameters = interfaceMember.node.typeParameters;

        if (!typeParameters) {
            return;
        }

        return U.getStringArray(fileNode, typeParameters);
    }

    public getInheritances(): (Array<string>|undefined) {
        const classMember = this;
        const classNode = classMember.node;
        const fileNode = classMember.file.node;
        const heritageClauses = classNode.heritageClauses;

        if (!heritageClauses) {
            return;
        }

        return U.getStringArray(fileNode, heritageClauses);
    }

    public toJSON(): InterfaceMember.JSON {
        const interfaceMember = this;
        const children = interfaceMember
            .getChildren()
            .map(child => child.toJSON());
        const commentTags = interfaceMember.getCommentTags();
        const generics = interfaceMember.getGenerics();
        const inheritances = interfaceMember.getInheritances();
        const meta = interfaceMember.getMeta();
        const name = interfaceMember.name;

        return {
            kind: 'interface',
            name,
            generics,
            inheritances,
            commentTags,
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
        inheritances?: Array<string>;
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
