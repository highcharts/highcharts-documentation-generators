/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './Member';
import TS from 'typescript';
export declare class ImportMember extends M.Member<TS.ImportDeclaration> {
    getBinding(): (string | undefined);
    getBindings(): (Array<string> | undefined);
    toJSON(): ImportMemberJSON;
}
export interface ImportMemberJSON extends M.MemberJSON {
    binding?: string;
    bindings?: Array<string>;
    kind: 'import';
    source: string;
}
export default ImportMember;
