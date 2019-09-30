/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import TS from 'typescript';
import NamespaceMember from './members/NamespaceMember';

export class Project {

    /* *
     *
     *  Static Functions
     *
     * */

    public static loadArguments(args: Array<string>): Project {
        return new Project(TS.parseCommandLine(args));
    }

    public static loadDirectory(directoryPath: string): Project {
        return Project.loadTSConfig(TS.sys.resolvePath(directoryPath));
    }

    public static loadTSConfig(filePath: string): Project {
        const tsConfig = TS.readJsonConfigFile(
            TS.sys.resolvePath(filePath),
            TS.sys.readFile
        );
        const parsedCommandLine = TS.parseJsonConfigFileContent(
            tsConfig,
            TS.sys,
            filePath
        );
        return new Project(parsedCommandLine);
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor (parsedCommandLine: TS.ParsedCommandLine) {

        this._directoryPath = (
            parsedCommandLine.options.project ||
            process.cwd()
        );

        this._program = TS.createProgram(
            parsedCommandLine.fileNames,
            parsedCommandLine.options
        );
    }

    /* *
     *
     *  Properties
     *
     * */

    private _directoryPath: string;
    private _program: TS.Program;

    /* *
     *
     *  Functions
     *
     * */

    public getChildren(): Array<NamespaceMember> {

        const directoryPath = this._directoryPath;

        let namespaceMember: (NamespaceMember|undefined);

        return this._program
            .getSourceFiles()
            .filter(function (node: TS.SourceFile): boolean {
                return node.fileName.startsWith(directoryPath);
            })
            .map(function (node: TS.SourceFile): NamespaceMember {
                namespaceMember = new NamespaceMember();
                namespaceMember.loadNode(node);
                return namespaceMember;
            });
    }
}

export default Project;
