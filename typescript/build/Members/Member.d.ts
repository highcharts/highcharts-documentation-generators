/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as JS from '../JSON/index';
import TS from 'typescript';
export declare class Member<TNode extends TS.Node = TS.Node> implements JS.JSONExporter {
    private static childrenJSONMapper;
    constructor(sourceFile: TS.SourceFile, node: TNode, isNotSupported?: boolean);
    private _isSupported;
    private _node;
    private _sourceFile;
    get isSupported(): boolean;
    protected get node(): TNode;
    protected get sourceFile(): TS.SourceFile;
    getChildNodes(): Array<TS.Node>;
    getChildren(): Array<Member>;
    getChildrenJSON(): Array<MemberJSON>;
    toJSON(): MemberJSON;
    toString(): string;
}
export interface MemberJSON extends JS.JSONObject {
    children?: Array<MemberJSON>;
    kind: string;
    kindID: TS.SyntaxKind;
    unsupportedNode?: TS.Node;
}
export default Member;
