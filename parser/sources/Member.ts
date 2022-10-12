/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import JSON from './JSON';
import ProjectFile from './ProjectFile';
import TypeScript from 'typescript';
import U from './Utilities';

/* *
 *
 *  Class
 *
 * */

export abstract class Member {

    /* *
     *
     *  Static Properties
     *
     * */

    public static readonly types: Record<string, typeof Member> = {};

    /* *
     *
     *  Static Functions
     *
     * */

    public static parse(
        _file: ProjectFile,
        _node: TypeScript.Node
    ): (Member|undefined) {
        return;
    }

    public static parseChildren(
        file: ProjectFile,
        node: TypeScript.Node,
        debug?: boolean
    ): Array<Member> {
        const children: Array<Member> = [],
            memberTypes = Member.types;

        let childMember: (Member|undefined);

        TypeScript.forEachChild(node, child => {
            for (const member in memberTypes) {
                childMember = memberTypes[member].parse(file, child);

                if (childMember) {
                    children.push(childMember);
                    break;
                }
            }
        });

        return children;
    }

    public static register(
        MemberClass: typeof Member
    ): void {
        Member.types[MemberClass.name] = MemberClass;
    }

    /* *
     *
     *  Constructor
     *
     * */

    protected constructor (
        file: ProjectFile,
        node: TypeScript.Node
    ) {
        this.file = file;
        this.node = node;
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly file: ProjectFile;

    public readonly node: TypeScript.Node;

    public get nodeText(): string {
        const member = this;

        if (typeof member._nodeText === 'undefined') {
            member._nodeText = member.node.getText(member.file.node);
        }

        return member._nodeText;
    }
    private _nodeText?: string;

    public get sourceText(): string {
        const member = this;

        if (typeof member._sourceText === 'undefined') {
            member._sourceText = member.node.getFullText(member.file.node);
        }

        return member._sourceText;
    }
    private _sourceText?: string;

    /* *
     *
     *  Functions
     *
     * */

    public getChildren(): Array<Member> {
        const member = this,
            memberFile = member.file;

        return Member.parseChildren(
            memberFile,
            member.node,
            memberFile.project.debug
        )
    }

    public getComment(): (string|undefined) {
        const member = this,
            nodeText = member.nodeText,
            sourceText = member.sourceText;
        return (
            sourceText
                .substring(0, sourceText.length - nodeText.length)
                .match(/[ \t]*\/\*.*\*\/[ \t]*/gmsu) ||
                []
        )[0];
    }

    public toJSON(
        skipChildren?: boolean
    ): Member.JSON {
        const member = this,
            node = member.node,
            file = member.file,
            children = (
                skipChildren ?
                    undefined :
                    Member
                        .parseChildren(file, node)
                        .map(child => child.toJSON())
            );

        return {
            kind: TypeScript.SyntaxKind[node.kind],
            comment: (member.getComment() || undefined),
            children
        };
    }

}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace Member {

    /* * 
     *
     *  Declarations
     *
     * */

    export interface JSON extends JSON.Object {
        kind: string;
        comment?: string;
        children?: Array<JSON>;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Member;
