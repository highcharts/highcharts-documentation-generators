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

    public getChildren(): Array<Member> {
        const projectFile = this;
        const fileNode = projectFile.node;
        const children: Array<Member> = [];
        const {
            debug,
            includePublic,
            includePrivate
        } = projectFile.project.options;

        let member: (Member|undefined);

        TypeScript.forEachChild(fileNode, child => {

            if (Member.skip.includes(child.kind)) {
                return;
            }

            if (
                includePublic &&
                (
                    TypeScript.isExportAssignment(child) ||
                    TypeScript.isExportDeclaration(child)
                )
            ) {
                children.push(...Member.parseChildren(projectFile, child));
                return;
            }

            if (
                debug ||
                includePrivate
            ) {
                member = Member.parse(projectFile, child);

                if (member) {
                    children.push(member);
                    return;
                }
            }
        });

        return children;
    }

    public getComment(): (string|undefined) {
        const projectFile = this;
        const fileNode = projectFile.node;
        const firstNode = fileNode.getFirstToken(fileNode);

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

    public getComments = Member.prototype.getComments;

    public getCommentTags = Member.prototype.getCommentTags;

    public getDebug = Member.prototype.getDebug;

    public getDecorators(): undefined {
        return;
    }

    public getMeta = Member.prototype.getMeta;

    public getModifiers(): undefined {
        return;
    }

    public getReflectedType(
        member: Member
    ): string {
        const projectFile = this;
        const memberNode = member.node;
        const memberType = projectFile.getTypeReflection(memberNode);

        return (
            memberType.pattern ?
                memberType.pattern.getText(projectFile.node) :
                'unknown'
        );
    }

    public getTypeReflection(
        node?: TypeScript.Node
    ): TypeScript.Type {
        const projectFile = this;
        const project = projectFile.project;

        return project.typeChecker.getTypeAtLocation(node || projectFile.node);
    }

    public toJSON(): ProjectFile.JSON {
        const projectFile = this;
        const children = projectFile
            .getChildren()
            .map(child => child.toJSON());
        const comment = projectFile.getComment();
        const meta = projectFile.getMeta();
        const name = projectFile.name;

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
