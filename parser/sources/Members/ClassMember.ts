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

export class ClassMember extends Member {

    /* *
     *
     *  Static Functions
     *
     * */

    public static parse(
        file: ProjectFile,
        node: TypeScript.Node
    ): (ClassMember|undefined) {

        if (!TypeScript.isClassLike(node)) {
            return;
        }

        return new ClassMember(file, node);
    }

    /* *
     *
     *  Constructor
     *
     * */

    protected constructor(
        file: ProjectFile,
        node: ClassMember.NodeType
    ) {
        super(file, node);
        this.name = node.name?.getText(file.node) || '';
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
        const classMember = this;
        const file = classMember.file;
        const children: Array<Member> = [];

        let child: (Member|undefined);

        for (const member of classMember.node.members) {
            child = Member.parse(file, member);

            if (child) {
                children.push(child);
            }
        }

        return children;
    }

    public getGenerics(): (Array<string>|undefined) {
        const classMember = this;
        const fileNode = classMember.file.node;
        const typeParameters = classMember.node.typeParameters;

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

    public toJSON(): ClassMember.JSON {
        const classMember = this;
        const children = classMember
            .getChildren()
            .map(child => child.toJSON());
        const commentTags = classMember.getCommentTags();
        const generics = classMember.getGenerics();
        const inheritances = classMember.getInheritances();
        const meta = classMember.getMeta();
        const name = classMember.name;

        return {
            kind: 'class',
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

export interface ClassMember {
    readonly node: ClassMember.NodeType;
}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace ClassMember {

    /* *
     *
     *  Declarations
     *
     * */

    export interface JSON extends Member.JSON {
        generics?: Array<string>;
        inheritances?: Array<string>;
        kind: 'class';
        name: string;
    }

    export type NodeType = TypeScript.ClassLikeDeclaration;

}

/* *
 *
 *  Registry
 *
 * */

Member.register(ClassMember);

/* *
 *
 *  Default Export
 *
 * */

export default ClassMember;
