/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './';
import TS from 'typescript';
export declare class DocletMember extends M.Member<TS.JSDoc> {
    getChildNodes(): Array<TS.JSDocTag>;
    getChildren(): Array<M.DocletTagMember>;
    getChildrenJSON(): Array<M.DocletTagMemberJSON>;
    toJSON(): DocletMemberJSON;
}
export interface DocletMemberJSON extends M.MemberJSON {
    children?: Array<M.DocletTagMemberJSON>;
    kind: 'doclet';
}
export default DocletMember;
