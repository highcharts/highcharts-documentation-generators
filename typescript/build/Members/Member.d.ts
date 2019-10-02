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
    private _isSupported;
    private _node;
    private _sourceFile;
    readonly isSupported: boolean;
    protected readonly node: TNode;
    protected readonly sourceFile: TS.SourceFile;
    getChildren(): Array<Member>;
    getChildrenJSON(): Array<MemberJSON>;
    toJSON(): MemberJSON;
    toString(): string;
}
export interface MemberJSON extends JSONNode {
    children: Array<MemberJSON>;
    kind: string;
    kindID: TS.SyntaxKind;
}
export default Member;
