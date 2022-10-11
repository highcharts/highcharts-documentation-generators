/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import Member from './Member';
import Project from './Project';
import TypeScript from 'typescript';

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

    public getComment(): string {
        return '';
    }

    public getTypeReflection(): TypeScript.Type {
        const projectFile = this,
            project = projectFile.project,
            node = projectFile.node;

        return project.typeChecker.getTypeAtLocation(node);
    }

    public toJSON(
        skipChildren?: boolean
    ): ProjectFile.JSON {
        const projectFile = this,
            node = projectFile.node,
            children = (
                skipChildren ?
                    [] :
                    Member
                        .parseChildren(projectFile, node)
                        .map(child => child.toJSON())
            );

        return {
            ...Member.prototype.toJSON.call(projectFile, true),
            kind: 'file',
            path: node.fileName,
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
        path: string;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default ProjectFile;
