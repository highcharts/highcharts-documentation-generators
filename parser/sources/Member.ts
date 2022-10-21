/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as TypeScript from 'typescript';

import JSDoc from './JSDoc';
import JSON from './JSON';
import ProjectFile from './ProjectFile';
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

    public static readonly skip: Array<TypeScript.SyntaxKind> = [
        TypeScript.SyntaxKind.EndOfFileToken
    ];

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
        node: TypeScript.Node
    ): Array<Member> {
        const children = (
            TypeScript.isClassLike(node) ||
            TypeScript.isEnumDeclaration(node) ||
            TypeScript.isInterfaceDeclaration(node) ? node.members :
            TypeScript.isBlock(node) ? node.statements :
            node.getChildren(file.node)
        );
        const members: Array<Member> = [];

        let member: (Member|undefined);

        for (const child of children) {

            if (Member.skip.includes(child.kind)) {
                continue;
            }

            member = Member.parse(file, child);

            if (member) {
                members.push(member);
            }
            // else if (TypeScript.isBlock(child)) {
            //     children.push(...Member.parseChildren(file, child));
            // }
        }

        return members;
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
        node.modifiers
    }

    /* *
     *
     *  Properties
     *
     * */

    protected _children?: Array<Member>;

    protected _decorators?: ReadonlyArray<TypeScript.Decorator>;

    protected _modifiers?: ReadonlyArray<TypeScript.Modifier>;

    public readonly file: ProjectFile;

    public readonly node: TypeScript.Node;

    /* *
     *
     *  Functions
     *
     * */

    public getChildren(): Array<Member> {
        const member = this;

        if (!member._children) {
            member._children = Member.parseChildren(
                member.file,
                member.node
            );
        }

        return member._children;
    }

    public getComment(): (string|undefined) {
        const member = this;
        const fileNode = member.file.node;
        const memberNode = member.node;
        const triviaWidth = memberNode.getLeadingTriviaWidth(fileNode);

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

    public getCommentTags(): Array<Member.CommentTag> {
        const member = this;
        const fileNode = member.file.node;
        const memberNode = member.node;
        const nodeChildren = memberNode.getChildren();
        const commentTags: Array<Member.CommentTag> = [];

        for (const child of nodeChildren) {
            if (!TypeScript.isJSDoc(child)) {
                break;
            }
            if (child.tags) {
                for (const tag of child.tags) {
                    commentTags.push({
                        tag: tag.tagName.getText(fileNode),
                        type: JSDoc.getTypeExpression(tag, fileNode),
                        name: JSDoc.getName(tag, fileNode),
                        text: JSDoc.getComment(tag, fileNode)
                    });
                }
            }
            else if (child.comment) {
                commentTags.push({
                    tag: 'description',
                    text: JSDoc.getComment(child, fileNode)
                });
            }
        }

        return commentTags;
    }

    public getComments(): (string|undefined) {
        const member = this;
        const fileNode = member.file.node;
        const memberNode = member.node;
        const triviaWidth = memberNode.getLeadingTriviaWidth(fileNode);

        if (!triviaWidth) {
            return;
        }

        return memberNode.getFullText(fileNode).substring(0, triviaWidth);
    }

    public getDebug(): Member.Debug {
        const member = this;
        const debug: Member.Debug = { kind: TypeScript.SyntaxKind.Unknown };
        const fileNode = member.file.node;
        const memberNode: Record<string, any> = member.node;

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

    public getDecorators(): (ReadonlyArray<TypeScript.Decorator>|undefined) {
        const member = this;
        const node = member.node;

        member._decorators = member._decorators || (
            TypeScript.canHaveDecorators(node) &&
            TypeScript.getDecorators(node) ||
            undefined
        );

        return member._decorators;
    }

    public getMeta(): Member.Meta {
        const member = this;
        const node = member.node;

        return {
            start: node.pos,
            end: node.end
        };
    }

    public getModifiers(): (ReadonlyArray<TypeScript.Modifier>|undefined) {
        const member = this;
        const node = member.node;

        member._modifiers = member._modifiers || (
            TypeScript.canHaveModifiers(node) &&
            TypeScript.getModifiers(node) ||
            undefined
        );

        return member._modifiers;
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

    export interface CommentTag extends JSON.Object {
        tag: string;
        text?: string
        type?: string;
        value?: string;
    }

    export interface Debug extends Record<string, (JSON.Collection|JSON.Primitive)> {
        kind: number;
    }

    export interface JSON extends JSON.Object {
        children?: Array<JSON>;
        comment?: string;
        commentTags?: Array<CommentTag>;
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
