/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './Members/index';
import TS from 'typescript';
export declare class Project {
    private static childrenJSONMapper;
    private static childrenFileMemberMapper;
    constructor(program: TS.Program);
    private _directoryPath;
    private _program;
    directoryPath: string;
    readonly program: TS.Program;
    getChildren(): Array<M.FileMember>;
    getChildrenJSON(): Array<M.FileMemberJSON>;
    getSourceFiles(): Array<TS.SourceFile>;
    toJSON(): ProjectJSON;
}
export interface ProjectJSON extends M.MemberJSON {
    children: Array<M.FileMemberJSON>;
    kind: 'project';
    path: string;
}
export default Project;
