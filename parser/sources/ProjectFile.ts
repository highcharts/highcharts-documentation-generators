/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import Member from './Member';
import Project from './Project';
import TypeScript from 'typescript';
import U from './Utilities';

/* *
 *
 *  Class
 *
 * */

export class ProjectFile implements Member {

    /* *
     *
     *  Static Functions
     *
     * */

    public static parse(
        project: Project,
        node: TypeScript.SourceFile
    ): ProjectFile {
        return new ProjectFile(project, node);
    }

    /* *
     *
     *  Constructor
     *
     * */

    protected constructor(
        project: Project,
        node: TypeScript.SourceFile
    ) {
        this.file = this;
        this.node = node;
        this.project = project;
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly file: ProjectFile;

    public readonly project: Project;

    public readonly node: TypeScript.SourceFile;

    public readonly nodeText = '';

    public readonly sourceText = '';

    /* * 
     *
     *  Functions
     *
     * */

    public getChildren(): Array<Member> {
        return Member.prototype.getChildren.call(this);
    }

    public getComment(): (string|undefined) {
        return Member.prototype.getComment.call(this);
    }

    public getReflectedType(
        member: Member
    ): string {
        const projectFile = this,
            memberNode = member.node,
            memberType = projectFile.getTypeReflection(memberNode);

        return (
            memberType.pattern ?
                memberType.pattern.getText(projectFile.node) :
                'unknown'
        );
    }

    public getTypeReflection(
        node?: TypeScript.Node
    ): TypeScript.Type {
        const projectFile = this,
            project = projectFile.project;

        return project.typeChecker.getTypeAtLocation(node || projectFile.node);
    }

    public toJSON(
        skipChildren?: boolean
    ): ProjectFile.JSON {
        const projectFile = this,
            project = projectFile.project,
            node = projectFile.node,
            children = (
                skipChildren ?
                    undefined :
                    Member
                        .parseChildren(projectFile, node)
                        .map(child => child.toJSON())
            ),
            comment = projectFile.getComment(),
            name = U.relative(project.path, node.fileName);
                // .replace(/(?:\.d)?\.[jt]sx?$/u, ''),

        return {
            kind: 'file',
            name,
            comment,
            children
        };
    }

}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace ProjectFile {

    /* * 
     *
     *  Declarations
     *
     * */

    export interface JSON extends Member.JSON {
        kind: 'file';
        name: string;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default ProjectFile;
