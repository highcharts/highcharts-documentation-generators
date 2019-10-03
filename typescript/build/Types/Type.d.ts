/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as JS from '../JSON/index';
import TS from 'typescript';
export declare class Type<TTypeNode extends TS.TypeNode = TS.TypeNode> implements JS.JSONExporter {
    constructor(typeNode: TTypeNode, isNotSupported?: boolean);
    private _isSupported;
    private _typeNode;
    readonly isSupported: boolean;
    protected readonly typeNode: TTypeNode;
    getChildren(): Array<Type>;
    toJSON(): TypeJSON;
    toString(): string;
}
export interface TypeJSON extends JS.JSONObject {
    children: Array<TypeJSON>;
    kind: string;
    kindID: TS.SyntaxKind;
}
export default Type;
