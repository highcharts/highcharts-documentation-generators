/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import Member from './Member';
import Project from './Project';
import * as TypeScript from 'typescript';
export declare class ProjectFile implements Member {
    static parse(project: Project, node: TypeScript.SourceFile): ProjectFile;
    protected constructor(project: Project, node: TypeScript.SourceFile);
    readonly file: ProjectFile;
    readonly project: Project;
    readonly name: string;
    readonly node: TypeScript.SourceFile;
    readonly codeText = "";
    readonly rangeText = "";
    getChildren(): Array<Member>;
    getComment(): (string | undefined);
    getComments: () => string | undefined;
    getCommentTags: () => Member.CommentTag[];
    getDebug: () => Member.Debug;
    getDecorators(): undefined;
    getMeta: () => Member.Meta;
    getModifiers(): undefined;
    getReflectedType(member: Member): string;
    getTypeReflection(node?: TypeScript.Node): TypeScript.Type;
    toJSON(): ProjectFile.JSON;
}
export declare namespace ProjectFile {
    interface JSON extends Member.JSON {
        kind: 'file';
        name: string;
    }
}
export default ProjectFile;
