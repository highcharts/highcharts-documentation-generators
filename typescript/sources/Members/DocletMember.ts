/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './';
import TS from 'typescript';

function childrenJSONMapper(nodeChild: M.DocletTagMember): M.DocletTagMemberJSON {
    return nodeChild.toJSON();
}

export class DocletMember extends M.Member<TS.JSDoc> {

    /* *
     *
     *  Functions
     *
     * */

    public getChildNodes(): Array<TS.JSDocTag> {
        return (this.node.tags || []).slice();
    }

    public getChildren(): Array<M.DocletTagMember> {

        const childNodes = this.getChildNodes();
        const children: Array<M.DocletTagMember> = [];
        const sourceFile = this.sourceFile;

        for (let childNode of childNodes) {
            children.push(new M.DocletTagMember(sourceFile, childNode));
        }

        return children;
    }

    public getChildrenJSON(): Array<M.DocletTagMemberJSON> {
        return this
            .getChildren()
            .map(childrenJSONMapper);
    }

    public toJSON(): DocletMemberJSON {

        const node = this.node;
        const superJSON = super.toJSON();
        const thisChildrenJSON = this.getChildrenJSON();

        return {
            children: thisChildrenJSON,
            kind: 'doclet',
            kindID: superJSON.kindID,
            text: node.comment
        };
    }
}

export interface DocletMemberJSON extends M.MemberJSON {
    children?: Array<M.DocletTagMemberJSON>;
    kind: 'doclet';
}

export default DocletMember;
