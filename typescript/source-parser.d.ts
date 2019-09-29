/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as typescript from 'typescript';
export declare class SourceParser {
    static parse(sourceDirectoryPath: string): Array<typescript.SourceFile>;
    private constructor();
    private _sourceDirectoryPath;
    private _typescript;
    private toAST;
}
