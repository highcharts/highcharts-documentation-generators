/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as JS from '../JSON/index';
import TS from 'typescript';
export declare class Type<TTypeNode extends TS.TypeNode = TS.TypeNode> implements JS.JSONExporter {
    constructor(sourceFile: TS.SourceFile, typeNode: TTypeNode, isNotSupported?: boolean);
    private _isSupported;
    private _sourceFile;
    private _typeNode;
    get isSupported(): boolean;
    protected get sourceFile(): TS.SourceFile;
    protected get typeNode(): TTypeNode;
    getChildren(): Array<Type>;
    toJSON(): TypeJSON;
    toString(): string;
}
export interface TypeJSON extends JS.JSONObject {
    children?: Array<TypeJSON>;
    kind: string;
    kindID: TS.SyntaxKind;
    name?: string;
    unsupportedNode?: TS.TypeNode;
}
export default Type;
