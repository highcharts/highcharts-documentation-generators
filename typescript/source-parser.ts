/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as typescript from 'typescript';

export class SourceParser {

    /* *
     *
     *  Static Functions
     *
     * */

    public static parse(
        sourceDirectoryPath: string
    ): Array<typescript.SourceFile> {
        const sourceParser = new SourceParser(sourceDirectoryPath);

        return sourceParser.toAST();
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor (sourceDirectoryPath: string) {
        const tsConfig = typescript.readJsonConfigFile(
            typescript.sys.resolvePath(sourceDirectoryPath + '/tsconfig.json'),
            typescript.sys.readFile
        );
        const commandLine = typescript.parseJsonConfigFileContent(
            tsConfig,
            typescript.sys,
            sourceDirectoryPath
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

    /* *
     *
     *  Functions
     *
     * */

    private toAST (): Array<typescript.SourceFile> {
        const sourceDirectoryPath = this._sourceDirectoryPath;

        return this._typescript
            .getSourceFiles()
            .filter(function (sourceFile: typescript.SourceFile): boolean {
                return sourceFile.fileName.startsWith(sourceDirectoryPath);
            });
    }
}
