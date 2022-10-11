/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import JSON from './JSON';
import NPM from './NPM';
import ProjectFile from './ProjectFile';
import TypeScript from 'typescript';
export declare class Project {
    static load(path: string): Promise<Project>;
    private constructor();
    readonly branch: string;
    readonly commit: string;
    readonly date: Date;
    readonly npm: NPM.JSON;
    readonly path: string;
    readonly program: TypeScript.Program;
    readonly system: TypeScript.System;
    readonly typeChecker: TypeScript.TypeChecker;
    getFiles(): Array<ProjectFile>;
    normalizePath(...paths: Array<string>): string;
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
        repository?: string;
        version: string;
    }
}
export default Project;
