/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as TypeScript from 'typescript';
import JSON from './JSON';
import NPM from './NPM';
import ProjectFile from './ProjectFile';
export declare class Project {
    static readonly System: TypeScript.System;
    static readonly defaultOptions: Project.Options;
    static load(path: string, options?: Project.Options): Promise<Project>;
    private constructor();
    readonly branch: string;
    readonly commit: string;
    readonly date: Date;
    readonly npm: NPM.JSON;
    readonly options: Project.Options;
    readonly path: string;
    readonly program: TypeScript.Program;
    readonly typeChecker: TypeScript.TypeChecker;
    getFiles(): Array<ProjectFile>;
    toJSON(): Project.JSON;
}
export declare namespace Project {
    interface JSON extends JSON.Object {
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
    interface Options extends JSON.Object {
        debug?: boolean;
        includePrivate?: boolean;
        includePublic?: boolean;
    }
}
export default Project;
