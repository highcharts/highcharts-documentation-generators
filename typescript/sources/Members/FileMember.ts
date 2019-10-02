/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './Member';
import TS from 'typescript';

export class FileMember extends M.Member<TS.SourceFile> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): FileMemberJSON {

        const superJSON = super.toJSON();

        return {
            children: superJSON.children,
            kind: 'file',
            kindID: superJSON.kindID,
            path: TS.sys.resolvePath(this.node.fileName)
        };
    }
}

export interface FileMemberJSON extends M.MemberJSON {
    kind: 'file';
    path: string;
}

export default FileMember;
