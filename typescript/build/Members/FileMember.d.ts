/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './';
import TS from 'typescript';
export declare class FileMember extends M.Member<TS.SourceFile> {
    constructor(node: TS.SourceFile);
    toJSON(): FileMemberJSON;
}
export interface FileMemberJSON extends M.MemberJSON {
    children: Array<M.MemberJSON>;
    kind: 'file';
    path: string;
}
export default FileMember;
