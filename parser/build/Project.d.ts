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
    static readonly System: TypeScript.System;
    static load(path: string, debug?: boolean): Promise<Project>;
    private constructor();
    readonly branch: string;
    readonly commit: string;
    readonly date: Date;
    readonly debug?: boolean;
    readonly npm: NPM.JSON;
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
        repository?: string;
        version: string;
    }
}
export default Project;
