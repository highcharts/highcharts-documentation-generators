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

import JSON from './JSON';
import Member from './Member';
import Path from 'path';
import TypeScript, {
    InterfaceDeclaration,
    ModuleBlock,
    ModuleDeclaration,
    Node,
    Program,
    PropertySignature,
    SourceFile,
    SyntaxKind,
    sys as System
} from 'typescript';

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
        const resolvedPath = System.resolvePath(path),
            parsedCommandLine = TypeScript.parseJsonConfigFileContent(
                TypeScript.readJsonConfigFile(
                    resolvedPath,
                    System.readFile
                ),
                System,
                resolvedPath
            );

        this.path = path;
        this.program = TypeScript.createProgram(
            parsedCommandLine.fileNames,
            parsedCommandLine.options
        );
        this.resolvedPath = resolvedPath;
    }

    /* *
     *
     *  Properties
     *
     * */

    private readonly files: Record<string, Project.File> = {};

    public readonly path: string;

    private readonly program: Program;

    public readonly resolvedPath: string;

    /* *
     *
     *  Functions
     *
     * */

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

    private parseFiles(): Array<Project.File> {
        const project = this,
            projectFiles = project.files,
            resolvedPath = project.resolvedPath,
            sourceFiles = project.program.getSourceFiles();

        if (!Object.keys(projectFiles).length) {
            let sourceFile: SourceFile,
                sourcePath: string;

            for (let i = 0, iEnd = sourceFiles.length; i < iEnd; ++i) {
                sourceFile = sourceFiles[i];

                if (sourceFile.fileName.startsWith(resolvedPath)) {
                    sourcePath = project.normalizePath(sourceFile.fileName);
                    projectFiles[sourcePath] = {
                        path: sourcePath,
                        children: Member.parseNodeChildren(
                            sourceFile.getChildAt(0, sourceFile),
                            sourceFile,
                            this
                        )
                    };
                }
            }
        }

        return Object.values(projectFiles);

    }

    public toJSON(): JSON.Collection {
        const project = this;

        return project.parseFiles();
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

    export interface File extends JSON.Object {
        path: string;
        children: Array<Member>;
    }

    export interface Member extends JSON.Object {
        kind: string;
        comment?: string;
        children?: Array<Member>;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Project;
