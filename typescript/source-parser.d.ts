/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as typescript from 'typescript';
export declare class SourceParser {
    constructor(sourceDirectoryPath: string);
    private _sourceDirectoryPath;
    private _typescript;
    readonly sourceDirectoryPath: string;
    toAST(): Array<typescript.SourceFile>;
}
