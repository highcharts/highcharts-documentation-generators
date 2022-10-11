/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import Git from './Git';
import JSON from './JSON';
import NPM from './NPM';
import TypeScript from 'typescript';

/* *
 *
 *  Class
 *
 * */

export class Project {

    /* *
     *
     *  Static Functions
     *
     * */

    public static async load(
        path: string
    ): Promise<Project> {
        const system = TypeScript.sys,
            cwd = process.cwd(),
            branch = await Git.getActiveBranch(cwd),
            commit = await Git.getLastCommit(cwd),
            npm = await NPM.load(cwd),
            resolvedPath = system.resolvePath(path),
            tsconfig = TypeScript.readJsonConfigFile(resolvedPath, system.readFile),
            config = TypeScript.parseJsonConfigFileContent(tsconfig, system, resolvedPath),
            program = TypeScript.createProgram(config.fileNames, config.options);

        return new Project(branch, commit, cwd, npm, path, program, system);
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor(
        branch: string,
        commit: string,
        cwd: string,
        npm: NPM.JSON,
        path: string,
        program: TypeScript.Program,
        system: TypeScript.System
    ) {
        this.branch = branch;
        this.commit = commit;
        this.cwd = cwd;
        this.date = new Date();
        this.npm = npm;
        this.path = path;
        this.program = program;
        this.system = system;
        this.typeChecker = program.getTypeChecker();
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly branch: string;

    public readonly commit: string;

    public readonly cwd: string;

    public readonly date: Date;

    public readonly npm: NPM.JSON;

    public readonly path: string;

    public readonly program: TypeScript.Program;

    public readonly system: TypeScript.System;

    public readonly typeChecker: TypeScript.TypeChecker;

    /* *
     *
     *  Functions
     *
     * */

    public getFileJSON(): Array<Project.FileJSON> {
        const files = this.program.getSourceFiles();

        for (const file of files) {
            TypeScript.forEachChild(file, child => {
                console.log(child);
            });
        }

        return [];
    }

    public toJSON(): Project.JSON {
        const {
            branch,
            commit,
            date,
            npm
        } = this;

        return {
            branch,
            commit,
            date: date.toISOString(),
            description: npm.description,
            name: npm.name,
            repository: npm.repository,
            version: npm.version,
            files: this.getFileJSON()
        };
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

    export interface FileJSON extends MemberJSON {
        kind: 'file';
        path: string;
    }

    export interface MemberJSON extends JSON.Object {
        kind: string;
        comment?: string;
        children?: Array<MemberJSON>;
    }

    export interface JSON extends JSON.Object {
        branch?: string;
        commit?: string;
        date?: string;
        description?: string;
        files: Array<FileJSON>;
        name: string;
        repository?: string;
        version: string;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Project;
