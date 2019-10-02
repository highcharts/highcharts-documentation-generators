/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import JSONNode from '../JSONNode';
import MembersUtilities from '../MembersUtilities';
import TS from 'typescript';

export class Member<TNode extends TS.Node = TS.Node> {

    /* *
     *
     *  Static Functions
     *
     * */

    private static childrenJSONMapper(child: Member): MemberJSON {
        return child.toJSON();
    }

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (node: TNode) {
        this._node = node;
    }

    /* *
     *
     *  Properties
     *
     * */

    private _node: TNode;

    protected get node(): TNode {
        return this._node;
    }

    /* *
     *
     *  Functions
     *
     * */

    public getChildren(): Array<Member> {

        const memberChildren: Array<Member> = [];

        let memberChild: (Member|undefined);
        let nodeChildren: Array<TS.Node>;

        try {
            nodeChildren = this.node.getChildren();
        }
        catch (error) {
            return [];
        }

        for (let nodeChild of nodeChildren) {

            memberChild = MembersUtilities.loadFromNode(nodeChild);

            if (typeof memberChild !== 'undefined') {
                memberChildren.push(memberChild);
            }
        }

        return memberChildren;
    }

    public getChildrenJSON(): Array<MemberJSON> {
        return this
            .getChildren()
            .map(Member.childrenJSONMapper);
    }

    public toJSON(): MemberJSON {
        return {
            children: this.getChildrenJSON(),
            kind: '',
            kindID: this.node.kind
        };
    }
}

export interface MemberJSON extends JSONNode {
    children: Array<MemberJSON>;
    kind: string;
    kindID: TS.SyntaxKind;
}

export default Member;
