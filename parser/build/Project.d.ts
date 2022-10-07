/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import JSON from './JSON';
import NPM from './NPM';
import TypeScript from 'typescript';
export declare class Project {
    static load(path: string): Promise<Project>;
    private constructor();
    readonly branch: string;
    readonly commit: string;
    readonly cwd: string;
    readonly date: Date;
    readonly npm: NPM.JSON;
    readonly path: string;
    readonly program: TypeScript.Program;
    readonly system: TypeScript.System;
    getFileJSON(): Array<Project.FileJSON>;
    toJSON(): Project.JSON;
}
export declare namespace Project {
    interface FileJSON extends MemberJSON {
        kind: 'file';
        path: string;
    }
    interface MemberJSON extends JSON.Object {
        kind: string;
        comment?: string;
        children?: Array<MemberJSON>;
    }
    interface JSON extends JSON.Object {
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
export default Project;
