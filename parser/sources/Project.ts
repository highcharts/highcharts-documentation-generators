/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as Path from 'path';
import * as TypeScript from 'typescript';

import Git from './Git';
import JSON from './JSON';
import NPM from './NPM';
import ProjectFile from './ProjectFile';

/* *
 *
 *  Class
 *
 * */

export class Project {

    /* *
     *
     *  Static Properties
     *
     * */

    public static readonly System = TypeScript.sys;

    public static readonly defaultOptions: Project.Options = {
        includePublic: true
    };

    /* *
     *
     *  Static Functions
     *
     * */

    public static async load(
        path: string,
        options?: Project.Options
    ): Promise<Project> {
 
        path = Project.System.resolvePath(path);

        const tsconfig = TypeScript.readJsonConfigFile(
                path,
                Project.System.readFile
            ),
            config = TypeScript.parseJsonConfigFileContent(
                tsconfig,
                Project.System,
                path
            ),
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
            options
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
        options?: Project.Options
    ) {
        this.branch = branch;
        this.commit = commit;
        this.date = new Date();
        this.npm = npm;
        this.options = {
            ...Project.defaultOptions,
            ...options
        };
        this.path = path;
        this.program = program;
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

    public readonly options: Project.Options;

    public readonly path: string;

    public readonly program: TypeScript.Program;

    public readonly typeChecker: TypeScript.TypeChecker;

    /* *
     *
     *  Functions
     *
     * */

    public getFiles(): Array<ProjectFile> {
        const project = this,
            projectPath = project.path,
            projectProgram = project.program,
            sourceFiles = projectProgram.getSourceFiles(),
            files: Array<ProjectFile> = [];

        for (const file of sourceFiles) {
            if (
                !file.fileName.startsWith(projectPath) ||
                file.getChildCount(file) < 2
            ) {
                continue;
            }

            files.push(ProjectFile.parse(project, file));
        }

        return files.sort((a, b) => {
            return (
                a.name < b.name ? -1 :
                a.name > b.name ? 1 :
                0
            );
        });
    }

    public toJSON(): Project.JSON {
        const project = this,
            {
                branch,
                commit,
                date,
                npm,
                options
            } = project;

        return {
            branch,
            commit,
            date: date.toISOString(),
            description: npm.description,
            name: npm.name,
            options,
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
        options?: Options;
        repository?: string;
        version: string;
    }

    export interface Options extends JSON.Object {
        debug?: boolean;
        includePrivate?: boolean;
        includePublic?: boolean;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Project;
