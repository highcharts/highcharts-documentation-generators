/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import type ImportedJSON from './JSON';
import TypeScript from 'typescript';
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
    private readonly files;
    readonly name: string;
    readonly options: Readonly<TypeScript.CompilerOptions>;
    readonly path: string;
    private readonly program;
    readonly repository: string;
    readonly resolvedPath: string;
    readonly version: string;
    getFileNames(): Array<string>;
    private getJSONFiles;
    getFiles(): Array<TypeScript.SourceFile>;
    normalizePath(...paths: Array<string>): string;
    toJSON(): Project.JSON;
    toString(): string;
}
export declare namespace Project {
    interface FileJSON extends MemberJSON {
        kind: 'file';
        path: string;
    }
    interface MemberJSON extends ImportedJSON.Object {
        kind: string;
        comment?: string;
        meta?: Utilities.Meta;
        children?: Array<MemberJSON>;
    }
    interface JSON extends ImportedJSON.Object {
        branch?: string;
        commit?: string;
        date?: string;
        description?: string;
        files: Array<FileJSON>;
        name?: string;
        repository?: string;
        version?: string;
    }
}
export default Project;
