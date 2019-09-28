/*
 * Copyright (C) Highsoft AS
 */

import * as path from 'path';
import * as typescript from 'typescript';

export class SourceParser {

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (sourceDirectoryPath: string) {
        const tsConfig = typescript.readJsonConfigFile(
            path.join(sourceDirectoryPath, 'tsconfig.json'),
            typescript.sys.readFile
        );
        const commandLine = typescript.parseJsonConfigFileContent(
            tsConfig,
            typescript.sys,
            __dirname
        );

        this._sourceDirectoryPath = sourceDirectoryPath;
        this._typescript = typescript.createProgram(
            commandLine.fileNames,
            commandLine.options
        );
    }

    /* *
     *
     *  Properties
     *
     * */

    private _sourceDirectoryPath: string;
    private _typescript: typescript.Program;

    public get sourceDirectoryPath(): string {
        return this._sourceDirectoryPath;
    }

    /* *
     *
     *  Functions
     *
     * */

    public toAST (): Array<typescript.SourceFile> {
        return this._typescript.getSourceFiles().slice();
    }
}
