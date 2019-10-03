/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as JS from '../JSON/index';
import TS from 'typescript';

export class Type<TTypeNode extends TS.TypeNode = TS.TypeNode>
    implements JS.JSONExporter
{

    /* *
     *
     *  Constructor
     *
     * */

    public constructor(typeNode: TTypeNode, isNotSupported: boolean = false) {
        this._isSupported = (isNotSupported === false);
        this._typeNode = typeNode;
    }

    /* *
     *
     *  Properties
     *
     * */

    private _isSupported: boolean;
    private _typeNode: TTypeNode;

    public get isSupported(): boolean {
        return this._isSupported;
    }

    protected get typeNode(): TTypeNode {
        return this._typeNode;
    }

    /* *
     *
     *  Functions
     *
     * */

    public getChildren(): Array<Type> {
        return [];
    }

    public toJSON(): TypeJSON {

        const typeNode = this.typeNode;

        return {
            children: [],
            kind: '',
            kindID: typeNode.kind
        };
    }

    public toString(): string {
        return this.typeNode.kind.toString();
    }
}

export interface TypeJSON extends JS.JSONObject {
    children: Array<TypeJSON>;
    kind: string;
    kindID: TS.SyntaxKind;
}

export default Type;
