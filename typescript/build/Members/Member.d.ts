/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import JSONNode from '../JSONNode';
import TS from 'typescript';
export declare class Member<TNode extends TS.Node = TS.Node> {
    private static childrenJSONMapper;
    constructor(node: TNode);
    private _node;
    protected readonly node: TNode;
    getChildren(): Array<Member>;
    getChildrenJSON(): Array<MemberJSON>;
    toJSON(): MemberJSON;
}
export interface MemberJSON extends JSONNode {
    children: Array<MemberJSON>;
    kind: string;
    kindID: TS.SyntaxKind;
}
export default Member;
