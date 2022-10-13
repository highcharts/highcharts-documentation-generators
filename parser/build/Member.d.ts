/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as TypeScript from 'typescript';
import JSON from './JSON';
import ProjectFile from './ProjectFile';
export declare abstract class Member {
    static readonly types: Record<string, typeof Member>;
    static parse(file: ProjectFile, node: TypeScript.Node): (Member | undefined);
    static parseChildren(file: ProjectFile, node: TypeScript.Node, debug?: boolean): Array<Member>;
    static register(MemberClass: typeof Member): void;
    protected constructor(file: ProjectFile, node: TypeScript.Node);
    private _children?;
    readonly file: ProjectFile;
    readonly node: TypeScript.Node;
    getChildren(): Array<Member>;
    getComment(): (string | undefined);
    getCommentTags(): Array<Member.CommentTag>;
    getComments(): (string | undefined);
    getDebug(): Member.Debug;
    getMeta(): Member.Meta;
    abstract toJSON(): Member.JSON;
}
export declare namespace Member {
    interface CommentTag extends JSON.Object {
        tag: string;
        text?: string;
        type?: string;
        value?: string;
    }
    interface Debug extends Record<string, (JSON.Collection | JSON.Primitive)> {
        kind: number;
    }
    interface JSON extends JSON.Object {
        children?: Array<JSON>;
        comment?: string;
        commentTags?: Array<CommentTag>;
        kind: string;
        meta: Meta;
    }
    interface Meta extends JSON.Object {
        start: number;
        end: number;
    }
}
export default Member;
