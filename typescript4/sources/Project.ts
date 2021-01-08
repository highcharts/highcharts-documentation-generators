/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

/* *
 *
 *  Imports
 *
 * */

import type JSON from './JSON';

import ChildProcess from 'child_process';
import JSDoc from './JSDoc';
import Member from './Member';
import Path from 'path';
import TypeScript, {
    Program,
    sys as System
} from 'typescript';
import Utilities from './Utilities';

/* *
 *
 *  Class
 *
 * */

/**
 * Project to document.
 */
export class Project {

    /* *
     *
     *  Static Functions
     *
     * */

    public static load(path: string): Project {
        return new Project(path);
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor (
        path: string
    ) {
        const cwd = process.cwd(),
            npm = require(`${cwd}/package.json`),
            resolvedPath = System.resolvePath(path),
            parsedCommandLine = TypeScript.parseJsonConfigFileContent(
                TypeScript.readJsonConfigFile(
                    resolvedPath,
                    System.readFile
                ),
                System,
                resolvedPath
            );

        this.branch = ChildProcess.execSync(
            'git rev-parse --abbrev-ref HEAD',
            { cwd }
        ).toString().trim();
        this.commit = ChildProcess.execSync(
            'git rev-parse --short HEAD',
            { cwd }
        ).toString().trim();
        this.date = new Date();
        this.description = npm.description;
        this.name = (npm.name || '');
        this.path = path;
        this.program = TypeScript.createProgram(
            parsedCommandLine.fileNames,
            parsedCommandLine.options
        );
        this.repository = (
            typeof npm.repository === 'string' ?
                npm.repository :
                npm.repository && npm.repository.url
        );
        this.resolvedPath = resolvedPath;
        this.version = (npm.version || '');
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly branch: string;

    public readonly commit: string;

    public readonly date: Date;

    public readonly description: (string|undefined);

    private files: (Record<string, Project.File>|undefined);

    public readonly name: string;

    public readonly path: string;

    private readonly program: Program;

    public readonly repository: string;

    public readonly resolvedPath: string;

    public readonly version: string;

    /* *
     *
     *  Functions
     *
     * */

    private getFiles(): Array<Project.File> {
        const project = this;

        if (!project.files) {
            const projectFiles: typeof project.files = project.files = {},
                resolvedPath = project.resolvedPath,
                sourceFiles = project.program.getSourceFiles();

            let sourceFile: TypeScript.SourceFile,
                sourceNode: TypeScript.Node,
                sourcePath: string;

            for (let i = 0, iEnd = sourceFiles.length; i < iEnd; ++i) {
                sourceFile = sourceFiles[i];

                if (sourceFile.fileName.startsWith(resolvedPath)) {
                    sourceNode = sourceFile.getChildAt(0, sourceFile);
                    sourcePath = project.normalizePath(sourceFile.fileName);
                    projectFiles[sourcePath] = {
                        kind: 'file',
                        path: sourcePath,
                        comment: JSDoc.extractSimpleComment(
                            sourceNode,
                            sourceFile
                        ),
                        meta: Utilities.extractMeta(
                            sourceFile,
                            sourceFile
                        ),
                        children: Member.parseNodeChildren(
                            sourceNode,
                            sourceFile,
                            project
                        )
                    };
                }
            }
        }

        return Object.values(project.files);
    }

    public normalizePath(...paths: Array<string>): string {
        const project = this,
            resolvedPath = project.resolvedPath;

        let path = System
            .resolvePath(Path.join(...paths))
            .replace(/(?:\.d)?\.[jt]sx?$/, '');

        if (Path.isAbsolute(path)) {
            path = Path.relative(resolvedPath, path);
        }

        return path;
    }

    public toJSON(): JSON.Object {
        const {
            branch,
            commit,
            date,
            description,
            name,
            repository,
            version
        } = this;

        return {
            name,
            version,
            repository,
            branch,
            commit,
            date: date.toISOString(),
            description,
            files: this.getFiles()
        };
    }

    public toString(): string {
        return '[object Project]';
    }

}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace Project {

    /* *
     *
     *  Declarations
     *
     * */

    export interface File extends Member {
        kind: 'file';
        path: string;
    }

    export interface Member extends JSON.Object {
        kind: string;
        comment?: string;
        meta?: Utilities.Meta;
        children?: Array<Member>;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Project;
