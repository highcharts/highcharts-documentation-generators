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

export class NamespaceMember extends Member {

    /* *
     *
     *  Static Functions
     *
     * */

    public static parse(
        file: ProjectFile,
        node: TypeScript.Node
    ): (NamespaceMember|undefined) {

        if (!U.isNamespaceDeclaration(node)) {
            return;
        }

        return new NamespaceMember(file, node);
    }

    /* *
     *
     *  Constructor
     *
     * */

    protected constructor(
        file: ProjectFile,
        node: NamespaceMember.NodeType
    ) {
        super(file, node);
        this.name = node.name.getText(file.node) || '';
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
        const moduleMember = this;
        const moduleNode = moduleMember.node;
        const file = moduleMember.file;

        return (
            moduleNode.body &&
            Member.parseChildren(file, moduleNode.body) ||
            []
        );
    }

    public toJSON(): NamespaceMember.JSON {
        const namespaceMember = this;
        const children = namespaceMember
            .getChildren()
            .map(child => child.toJSON());
        const commentTags = namespaceMember.getCommentTags();
        const meta = namespaceMember.getMeta();
        const name = namespaceMember.name;

        return {
            kind: 'namespace',
            name,
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

export interface NamespaceMember {
    readonly node: NamespaceMember.NodeType;
}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace NamespaceMember {

    /* *
     *
     *  Declarations
     *
     * */

    export interface JSON extends Member.JSON {
        kind: 'namespace';
        name: string;
    }

    export type NodeType = (
        TypeScript.NamespaceDeclaration
    );

}

/* *
 *
 *  Registry
 *
 * */

Member.register(NamespaceMember);

/* *
 *
 *  Default Export
 *
 * */

export default NamespaceMember;
