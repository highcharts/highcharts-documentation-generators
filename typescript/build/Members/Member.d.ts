/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import JSONNode from '../JSONNode';
import TS from 'typescript';
export declare class Member<TNode extends TS.Node = TS.Node> {
    private static childrenJSONMapper;
    constructor(sourceFile: TS.SourceFile, node: TNode, isNotSupported?: boolean);
    private _isNotSupported;
    private _node;
    private _sourceFile;
    protected readonly isNotSupported: boolean;
    protected readonly node: TNode;
    protected readonly sourceFile: TS.SourceFile;
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
