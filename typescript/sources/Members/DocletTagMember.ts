/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './';
import TS from 'typescript';

export class DocletTagMember extends M.Member<TS.JSDocTag> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): DocletTagMemberJSON {

        const node = this.node;
        const superJSON = super.toJSON();

        return {
            kind: 'doclettag',
            kindID: superJSON.kindID,
            tag: node.tagName.escapedText,
            text: node.comment
        };
    }
}

export interface DocletTagMemberJSON extends M.MemberJSON {
    children?: undefined;
    kind: 'doclettag';
}

export default DocletTagMember;
