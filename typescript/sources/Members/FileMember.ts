/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './';
import TS from 'typescript';

export class FileMember extends M.Member<TS.SourceFile> {

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (node: TS.SourceFile) {
        super(node, node);
    }

    /* *
     * 
     *  Functions
     *
     * */

    public getChildNodes(): Array<TS.Node> {
        return this.node.getChildren(this.sourceFile)[0].getChildren(this.sourceFile);
    }

    public toJSON(): FileMemberJSON {

        const superJSON = super.toJSON();

        return {
            children: superJSON.children || [],
            kind: 'file',
            kindID: superJSON.kindID,
            path: TS.sys.resolvePath(this.node.fileName)
        };
    }
}

export interface FileMemberJSON extends M.MemberJSON {
    children: Array<M.MemberJSON>;
    kind: 'file';
    path: string;
}

export default FileMember;
