/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import type JSON from './JSON';
import Utilities from './Utilities';
/**
 * Project to document.
 */
export declare class Project {
    static load(path: string): Project;
    private constructor();
    readonly branch: string;
    readonly commit: string;
    readonly date: Date;
    readonly description: (string | undefined);
    private files;
    readonly name: string;
    readonly path: string;
    private readonly program;
    readonly repository: string;
    readonly resolvedPath: string;
    readonly version: string;
    private getFiles;
    normalizePath(...paths: Array<string>): string;
    toJSON(): JSON.Object;
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
        meta?: Utilities.Meta;
        children?: Array<Member>;
    }
}
export default Project;
