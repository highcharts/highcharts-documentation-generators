/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import TS from 'typescript';
import JSONNode from '../JSONNode';
export declare class Member<TNode extends TS.Node = TS.Node> implements JSONNode {
    constructor(node: TNode);
    private _node;
    protected readonly node: TNode;
    getChildren(): Array<Member>;
    toJSON(): ReturnType<JSONNode['toJSON']>;
}
export default Member;
