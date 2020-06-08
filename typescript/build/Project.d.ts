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
    static debug(sourcePath: string, targetPath: string): void;
    static loadFromArguments(args: Array<string>): Project;
    static loadFromDirectory(directoryPath: string): Project;
    constructor(program: TS.Program);
    private _directoryPath;
    private _program;
    get directoryPath(): string;
    set directoryPath(value: string);
    get program(): TS.Program;
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
