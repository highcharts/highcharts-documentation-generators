/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import Member from './Member';
import Project from './Project';
import * as TypeScript from 'typescript';
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
        this.name = U.relative(project.path, node.fileName);
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

    public readonly name: string;

    public readonly node: TypeScript.SourceFile;

    public readonly codeText = '';

    public readonly rangeText = '';

    /* * 
     *
     *  Functions
     *
     * */

    public getChildren = Member.prototype.getChildren;

    public getComment = Member.prototype.getComment;

    public getComments = Member.prototype.getComments;

    public getCommentTags = Member.prototype.getCommentTags;

    public getDebug = Member.prototype.getDebug;

    public getFirstComment(): (string|undefined) {
        const projectFile = this,
            fileNode = projectFile.node,
            firstNode = fileNode.getFirstToken(fileNode);

        if (!firstNode) {
            return;
        }

        const firstMember = Member.parse(projectFile, firstNode);

        if (!firstMember) {
            return;
        }

        const comment = firstMember.getComments();

        if (
            !comment ||
            !comment.includes('*/')
        ) {
            return;
        }

        return comment.substring(0, comment.indexOf('*/') + 2);
    }

    public getMeta = Member.prototype.getMeta;

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

    public toJSON(): ProjectFile.JSON {
        const projectFile = this,
            fileNode = projectFile.node,
            children = Member
                .parseChildren(projectFile, fileNode)
                .map(child => child.toJSON()),
            comment = projectFile.getFirstComment(),
            meta = projectFile.getMeta(),
            name = projectFile.name;

        return {
            kind: 'file',
            name,
            comment,
            meta,
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
