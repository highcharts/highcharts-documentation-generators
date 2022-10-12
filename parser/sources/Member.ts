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
 *  Constants
 *
 * */

const DEBUG_SKIP: Array<string> = [
    'end',
    'parent',
    'pos'
];

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
        file: ProjectFile,
        node: TypeScript.Node
    ): (Member|undefined) {
        const memberTypes = Member.types;

        let member: (Member|undefined);

        for (const type in memberTypes) {
            member = memberTypes[type].parse(file, node);

            if (member) {
                return member;
            }
        }

        return;
    }

    public static parseChildren(
        file: ProjectFile,
        node: TypeScript.Node,
        debug?: boolean
    ): Array<Member> {
        const memberTypes = Member.types,
            children: Array<Member> = [];

        let member: (Member|undefined);

        TypeScript.forEachChild(node, child => {
            member = Member.parse(file, child);

            if (member) {
                children.push(member);
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

    private _children?: Array<Member>;

    public readonly file: ProjectFile;

    public readonly node: TypeScript.Node;

    public get codeText(): string {
        const member = this;

        if (typeof member._codeText === 'undefined') {
            member._codeText = member.node.getText(member.file.node);
        }

        return member._codeText;
    }
    private _codeText?: string;

    public get rangeText(): string {
        const member = this;

        if (typeof member._rangeText === 'undefined') {
            member._rangeText = member.node.getFullText(member.file.node);
        }

        return member._rangeText;
    }
    private _rangeText?: string;

    /* *
     *
     *  Functions
     *
     * */

    public getChildren(): Array<Member> {
        const member = this;

        if (!member._children) {
            const memberFile = member.file;

            member._children = Member.parseChildren(
                memberFile,
                member.node,
                memberFile.project.debug
            );
        }

        return member._children
    }

    public getComment(): (string|undefined) {
        const member = this,
            fileNode = member.file.node,
            memberNode = member.node,
            triviaWidth = memberNode.getLeadingTriviaWidth(fileNode);

        if (!triviaWidth) {
            return;
        }

        return (
            memberNode
                .getFullText(fileNode)
                .substring(0, triviaWidth)
                .match(/[ \t]*\/\*\*.*\*\/[ \t]*/gsu) ||
                []
        )[0];
    }

    public getComments(): (string|undefined) {
        const member = this,
            fileNode = member.file.node,
            memberNode = member.node,
            triviaWidth = memberNode.getLeadingTriviaWidth(fileNode);

        if (!triviaWidth) {
            return;
        }

        return memberNode.getFullText(fileNode).substring(0, triviaWidth);
    }

    public getDebug(): Member.Debug {
        const member = this,
            debug: Member.Debug = { kind: TypeScript.SyntaxKind.Unknown },
            fileNode = member.file.node,
            memberNode: Record<string, any> = member.node;

        let property: any;

        for (const key in memberNode) {
            property = memberNode[key];

            if (
                key[0] === '_' ||
                DEBUG_SKIP.includes(key)
            ) {
                continue;
            }

            switch (typeof property) {
                case 'boolean':
                case 'number':
                    debug[key] = property;
                    continue;
                case 'function':
                    if (key === 'getText') {
                        debug[key] = U.firstLine(
                            memberNode.getText(fileNode),
                            120
                        );
                    }
                    continue;
                case 'undefined':
                    continue;
            }

            if (
                property &&
                typeof property === 'object' &&
                typeof property.getText === 'function'
            ) {
                debug[key] = U.firstLine(property.getText(fileNode), 120);
            }
            else {
                debug[key] = U.firstLine(`${property}`, 120);
            }
        }

        return debug;
    }

    public getMeta(): Member.Meta {
        const member = this,
            node = member.node;

        return {
            start: node.pos,
            end: node.end
        };
    }

    public abstract toJSON(): Member.JSON;

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

    export interface Debug extends Record<string, (JSON.Collection|JSON.Primitive)> {
        kind: number;
    }

    export interface JSON extends JSON.Object {
        children?: Array<JSON>;
        comment?: string;
        kind: string;
        meta: Meta;
    }

    export interface Meta extends JSON.Object {
        start: number,
        end: number
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Member;
