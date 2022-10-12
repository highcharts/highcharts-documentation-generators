/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import Member from './Member';
import Project from './Project';
import TypeScript from 'typescript';
export declare class ProjectFile implements Member {
    static parse(project: Project, node: TypeScript.SourceFile): ProjectFile;
    protected constructor(project: Project, node: TypeScript.SourceFile);
    readonly file: ProjectFile;
    readonly project: Project;
    readonly node: TypeScript.SourceFile;
    readonly nodeText = "";
    readonly sourceText = "";
    getChildren(): Array<Member>;
    getComment(): (string | undefined);
    getReflectedType(member: Member): string;
    getTypeReflection(node?: TypeScript.Node): TypeScript.Type;
    toJSON(skipChildren?: boolean): ProjectFile.JSON;
}
export declare namespace ProjectFile {
    interface JSON extends Member.JSON {
        kind: 'file';
        name: string;
    }
}
export default ProjectFile;
