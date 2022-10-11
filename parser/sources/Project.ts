/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import Git from './Git';
import JSON from './JSON';
import NPM from './NPM';
import Path from 'path';
import ProjectFile from './ProjectFile';
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
        const system = TypeScript.sys;

        path = system.resolvePath(path);

        const tsconfig = TypeScript.readJsonConfigFile(path, system.readFile),
            config = TypeScript.parseJsonConfigFileContent(tsconfig, system, path),
            program = TypeScript.createProgram(config.fileNames, config.options),
            cwd = program.getCurrentDirectory(),
            branch = await Git.getActiveBranch(cwd),
            commit = await Git.getLastCommit(cwd),
            npm = await NPM.load(Path.join(cwd, 'package.json'));

        return new Project(
            branch,
            commit,
            npm,
            path,
            program,
            system
        );
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor(
        branch: string,
        commit: string,
        npm: NPM.JSON,
        path: string,
        program: TypeScript.Program,
        system: TypeScript.System
    ) {
        this.branch = branch;
        this.commit = commit;
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

    public getFiles(): Array<ProjectFile> {
        const project = this,
            projectPath = project.path;

        return project.program
            .getSourceFiles()
            .filter(file => file.fileName.startsWith(projectPath))
            .map(file => ProjectFile.parse(project, file));
    }

    public normalizePath(...paths: Array<string>): string {
        const project = this,
            projectPath = project.path,
            system = project.system;

        let path = system.resolvePath(Path.join(...paths));
        // .replace(/(?:\.d)?\.[jt]sx?$/, '');

        if (Path.isAbsolute(path)) {
            path = Path.relative(projectPath, path);
        }

        return path;
    }

    public toJSON(): Project.JSON {
        const project = this,
            {
                branch,
                commit,
                date,
                npm
            } = project;

        return {
            branch,
            commit,
            date: date.toISOString(),
            description: npm.description,
            name: npm.name,
            repository: npm.repository,
            version: npm.version,
            files: project
                .getFiles()
                .map(file => file.toJSON())
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

    export interface JSON extends JSON.Object {
        branch?: string;
        commit?: string;
        date?: string;
        description?: string;
        files: Array<ProjectFile.JSON>;
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
