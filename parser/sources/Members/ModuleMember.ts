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

export class ModuleMember extends Member {

    /* *
     *
     *  Static Functions
     *
     * */

    public static parse(
        file: ProjectFile,
        node: TypeScript.Node
    ): (ModuleMember|undefined) {

        if (
            !U.isModuleDeclaration(node)) {
            return;
        }

        return new ModuleMember(file, node);
    }

    /* *
     *
     *  Constructor
     *
     * */

    protected constructor(
        file: ProjectFile,
        node: ModuleMember.NodeType
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
        const file = moduleMember.file;
        const moduleNode = moduleMember.node;

        return (
            moduleNode.body &&
            Member.parseChildren(file, moduleNode.body) ||
            []
        );
    }

    public toJSON(): ModuleMember.JSON {
        const moduleMember = this;
        const children = moduleMember
            .getChildren()
            .map(child => child.toJSON());
        const commentTags = moduleMember.getCommentTags();
        const meta = moduleMember.getMeta();
        const name = moduleMember.name;

        return {
            kind: 'module',
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

export interface ModuleMember {
    readonly node: ModuleMember.NodeType;
}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace ModuleMember {

    /* *
     *
     *  Declarations
     *
     * */

    export interface JSON extends Member.JSON {
        kind: 'module';
        name: string;
    }

    export type NodeType = TypeScript.ModuleDeclaration;

}

/* *
 *
 *  Registry
 *
 * */

Member.register(ModuleMember);

/* *
 *
 *  Default Export
 *
 * */

export default ModuleMember;
