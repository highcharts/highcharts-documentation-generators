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

        const children: Array<M.FileMember> = [];
        const directoryPath = this.directoryPath;
        const fileNodes = this.program.getSourceFiles();

        let child: (M.FileMember|undefined);

        for (let fileNode of fileNodes) {

            if (!fileNode.fileName.startsWith(directoryPath)) {
                continue;
            }

            child = new M.FileMember(fileNode);

            if (typeof child !== 'undefined') {
                children.push(child);
            }
        }

        return children;
    }

    public getChildrenJSON(): Array<M.FileMemberJSON> {
        return this
            .getChildren()
            .map(Project.childrenJSONMapper);
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
