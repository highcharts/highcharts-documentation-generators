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

        const filteredSourceFile: Array<TS.SourceFile> = [];
        const directoryPath = this.directoryPath;
        const sourceFiles = this.program.getSourceFiles();

        for (let fileNode of sourceFiles) {

            if (fileNode.fileName.startsWith(directoryPath)) {
                filteredSourceFile.push(fileNode);
            }
        }

        return filteredSourceFile;
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
