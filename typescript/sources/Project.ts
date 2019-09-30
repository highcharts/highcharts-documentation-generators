/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import TS from 'typescript';
import JSONNode from './JSONNode';
import ModuleMember from './Members/ModuleMember';

export class Project implements JSONNode {

    /* *
     *
     *  Static Functions
     *
     * */

    public static loadFromArguments(args: Array<string>): Project {
        return new Project(TS.parseCommandLine(args), process.cwd());
    }

    public static loadFromDirectory(directoryPath: string): Project {

        const tsConfig = TS.readJsonConfigFile(
            TS.sys.resolvePath(directoryPath),
            TS.sys.readFile
        );

        const parsedCommandLine = TS.parseJsonConfigFileContent(
            tsConfig,
            TS.sys,
            directoryPath
        );

        return new Project(parsedCommandLine, directoryPath);
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor (
        parsedCommandLine: TS.ParsedCommandLine,
        directoryPath: string
    ) {

        this._directoryPath = (directoryPath || process.cwd());

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

    public getChildren(): Array<ModuleMember> {

        const directoryPath = this._directoryPath;
        const memberChildren: Array<ModuleMember> = [];
        const nodeChildren = this._program.getSourceFiles();

        for (let nodeChild of nodeChildren) {
            if (nodeChild.fileName.startsWith(directoryPath)) {
                memberChildren.push(new ModuleMember(nodeChild));
            }
        }

        return memberChildren;
    }

    public toJSON(): object {

        return {
            children: this.getChildren(),
            kind: 'project',
            path: this._directoryPath
        }
    }
}

export default Project;
