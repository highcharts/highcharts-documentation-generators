/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as D from './Doclet';
import TS from 'typescript';
export declare class DocletComment extends D.Doclet<TS.JSDoc> {
    toJSON(): DocletCommentJSON;
}
export interface DocletCommentJSON extends D.DocletJSON {
    children: Array<D.DocletJSON>;
    kind: 'doclet';
}
export default BlockMember;
