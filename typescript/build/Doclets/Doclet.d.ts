/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as JS from '../JSON/';
import TS from 'typescript';
export declare class Doclet<TNode extends TS.Node = TS.Node> implements JS.JSONExporter {
    private static childrenJSONMapper;
    constructor(sourceFile: TS.SourceFile, node: TNode, isNotSupported?: boolean);
    private _isSupported;
    private _node;
    private _sourceFile;
    get isSupported(): boolean;
    protected get node(): TNode;
    protected get sourceFile(): TS.SourceFile;
    getChildNodes(): Array<TS.Node>;
    getChildren(): Array<Doclet>;
    getChildrenJSON(): Array<DocletJSON>;
    toJSON(): DocletJSON;
    toString(): string;
}
export interface DocletJSON extends JS.JSONObject {
    children?: Array<DocletJSON>;
    kind: string;
    kindID: TS.SyntaxKind;
    unsupportedNode?: TS.Node;
}
export default Doclet;
