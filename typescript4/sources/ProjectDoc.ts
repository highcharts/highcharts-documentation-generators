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

import type ImportedJSON from './JSON';

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
export class ProjectDoc {

    /* *
     *
     *  Static Functions
     *
     * */

    public static load(path: string): ProjectDoc {
        return new ProjectDoc(path);
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
        this.options = parsedCommandLine.options;
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

    private readonly files: Array<TypeScript.SourceFile> = [];

    public readonly name: string;

    public readonly options: Readonly<TypeScript.CompilerOptions>;

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

    public getFileNames(): Array<string> {
        return Object.keys(this.getJSONFiles());
    }

    private getJSONFiles(): Record<string, ProjectDoc.FileJSON> {
        const project = this,
            jsonFiles: Record<string, ProjectDoc.FileJSON> = {},
            projectFiles = project.getFiles();

        let sourceFile: TypeScript.SourceFile,
            sourceNode: TypeScript.Node,
            sourcePath: string;

        for (let i = 0, iEnd = projectFiles.length; i < iEnd; ++i) {
            sourceFile = projectFiles[i];
            sourceNode = sourceFile.getChildAt(0, sourceFile);
            sourcePath = project.normalizePath(sourceFile.fileName);
            jsonFiles[sourcePath] = {
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

        return jsonFiles;
    }

    public getFiles(): Array<TypeScript.SourceFile>{
        const project = this,
            projectFiles = project.files;

        if (!projectFiles.length) {
            const resolvedPath = project.resolvedPath,
                sourceFiles = project.program.getSourceFiles();

            let sourceFile: TypeScript.SourceFile;

            for (let i = 0, iEnd = sourceFiles.length; i < iEnd; ++i) {
                sourceFile = sourceFiles[i];
                if (sourceFile.fileName.startsWith(resolvedPath)) {
                    projectFiles.push(sourceFile);
                }
            }
        }

        return projectFiles;
    }

    public normalizePath(...paths: Array<string>): string {
        const project = this,
            resolvedPath = project.resolvedPath;

        let path = System.resolvePath(Path.join(...paths));
        // .replace(/(?:\.d)?\.[jt]sx?$/, '');

        if (Path.isAbsolute(path)) {
            path = Path.relative(resolvedPath, path);
        }

        return path;
    }

    public toJSON(): ProjectDoc.JSON {
        const project = this,
            {
                branch,
                commit,
                date,
                description,
                name,
                repository,
                version
            } = project,
            fileNames = project.getFileNames(),
            jsonFiles = project.getJSONFiles();

        return {
            name,
            version,
            repository,
            branch,
            commit,
            date: date.toISOString(),
            description,
            files: fileNames
                .sort()
                .map(fileName => jsonFiles[fileName])
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

export namespace ProjectDoc {

    /* *
     *
     *  Declarations
     *
     * */

    export interface FileJSON extends MemberJSON {
        kind: 'file';
        path: string;
    }

    export interface MemberJSON extends ImportedJSON.Object {
        kind: string;
        comment?: string;
        meta?: Utilities.Meta;
        children?: Array<MemberJSON>;
    }

    export interface JSON extends ImportedJSON.Object {
        branch?: string;
        commit?: string;
        date?: string;
        description?: string;
        files: Array<FileJSON>;
        name?: string;
        repository?: string;
        version?: string;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default ProjectDoc;
