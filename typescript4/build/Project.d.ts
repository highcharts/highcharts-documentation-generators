/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import JSON from './JSON';
/**
 * Project to document.
 */
export declare class Project {
    static load(path: string): Project;
    private constructor();
    private readonly files;
    readonly path: string;
    private readonly program;
    readonly resolvedPath: string;
    normalizePath(...paths: Array<string>): string;
    private parseFiles;
    toJSON(): Array<Project.File>;
    toString(): string;
}
export declare namespace Project {
    interface File extends Member {
        kind: 'file';
        path: string;
    }
    interface Member extends JSON.Object {
        kind: string;
        comment?: string;
        children?: Array<Member>;
    }
}
export default Project;
