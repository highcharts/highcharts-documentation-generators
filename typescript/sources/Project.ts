/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './Members/index';
import TS from 'typescript';

export class Project {

    /* *
     *
     *  Static Functions
     *
     * */

    private static childrenJSONMapper(
        child: M.FileMember
    ): M.FileMemberJSON {
        return child.toJSON();
    }

    private static childrenFileMemberMapper(
        child: TS.SourceFile
    ): M.FileMember {
        return new M.FileMember(child);
    }

    public static loadFromArguments(args: Array<string>): Project {

        const parsedCommandLine = TS.parseCommandLine(args);

        return new Project(
            TS.createProgram(
                parsedCommandLine.fileNames,
                parsedCommandLine.options
            )
        );
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

        const project = new Project(
            TS.createProgram(
                parsedCommandLine.fileNames,
                parsedCommandLine.options
            )
        );

        project.directoryPath = directoryPath;

        return project;
    }

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (program: TS.Program) {
        this._program = program;
    }

    /* *
     *
     *  Properties
     *
     * */

    private _directoryPath: (string|undefined);
    private _program: TS.Program;

    public get directoryPath(): string {
        return (this._directoryPath || '');
    }
    public set directoryPath(value: string) {
        if (typeof this._directoryPath === 'undefined') {
            this._directoryPath = value;
        }
    }

    public get program(): TS.Program {
        return this._program;
    }

    /* *
     *
     *  Functions
     *
     * */

    public getChildren(): Array<M.FileMember> {
        return this
            .getSourceFiles()
            .map(Project.childrenFileMemberMapper);
    }

    public getChildrenJSON(): Array<M.FileMemberJSON> {
        return this
            .getChildren()
            .map(Project.childrenJSONMapper);
    }

    public getSourceFiles(): Array<TS.SourceFile> {

        const filteredSourceFiles: Array<TS.SourceFile> = [];
        const directoryPath = this.directoryPath;
        const sourceFiles = this.program.getSourceFiles();

        for (let fileNode of sourceFiles) {

            if (fileNode.fileName.startsWith(directoryPath)) {
                filteredSourceFiles.push(fileNode);
            }
        }

        return filteredSourceFiles;
    }

    public toJSON(): ProjectJSON {
        return {
            children: this.getChildrenJSON(),
            kind: 'project',
            kindID: TS.SyntaxKind.Unknown,
            path: this.directoryPath
        };
    }
}

export interface ProjectJSON extends M.MemberJSON {
    children: Array<M.FileMemberJSON>;
    kind: 'project';
    path: string;
}

export default Project;
