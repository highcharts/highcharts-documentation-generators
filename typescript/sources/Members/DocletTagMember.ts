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

        const superJSON = super.toJSON();
        const thisNode = this.node;

        return {
            kind: 'doclettag',
            kindID: superJSON.kindID,
            tag: thisNode.tagName.escapedText,
            text: thisNode.comment
        };
    }
}

export interface DocletTagMemberJSON extends M.MemberJSON {
    children?: undefined;
    kind: 'doclettag';
}

export default DocletTagMember;
