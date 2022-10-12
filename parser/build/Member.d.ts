/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import JSON from './JSON';
import ProjectFile from './ProjectFile';
import TypeScript from 'typescript';
export declare abstract class Member {
    static readonly types: Record<string, typeof Member>;
    static parse(_file: ProjectFile, _node: TypeScript.Node): (Member | undefined);
    static parseChildren(file: ProjectFile, node: TypeScript.Node, debug?: boolean): Array<Member>;
    static register(MemberClass: typeof Member): void;
    protected constructor(file: ProjectFile, node: TypeScript.Node);
    readonly file: ProjectFile;
    readonly node: TypeScript.Node;
    get nodeText(): string;
    private _nodeText?;
    get sourceText(): string;
    private _sourceText?;
    getChildren(): Array<Member>;
    getComment(): (string | undefined);
    toJSON(skipChildren?: boolean): Member.JSON;
}
export declare namespace Member {
    interface JSON extends JSON.Object {
        kind: string;
        comment?: string;
        children?: Array<JSON>;
    }
}
export default Member;
