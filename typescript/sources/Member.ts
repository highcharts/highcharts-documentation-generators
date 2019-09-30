/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import TS from 'typescript';
import JSONNode from './JSONNode';
import MembersUtilities from './MemberUtilities';

export class Member<TNode extends TS.Node = TS.Node> implements JSONNode {

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
        const nodeChildren = this._node.getChildren();

        let memberChild: (Member|undefined);

        for (let nodeChild of nodeChildren) {

            memberChild = MembersUtilities.load(nodeChild);

            if (typeof memberChild !== 'undefined') {
                memberChildren.push(memberChild);
            }
        }

        return memberChildren;
    }

    public toJSON(): ReturnType<JSONNode['toJSON']> {
        return {
            children: this
                .getChildren()
                .map(function (
                    child: Member<TS.Node>
                ): ReturnType<JSONNode['toJSON']> {
                    return child.toJSON();
                })
        };
    }
}

export default Member;
