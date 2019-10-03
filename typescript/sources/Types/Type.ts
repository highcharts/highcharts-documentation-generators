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

    public constructor(
        sourceFile: TS.SourceFile,
        typeNode: TTypeNode,
        isNotSupported: boolean = false
    ) {
        this._isSupported = (isNotSupported === false);
        this._sourceFile = sourceFile;
        this._typeNode = typeNode;
    }

    /* *
     *
     *  Properties
     *
     * */

    private _isSupported: boolean;
    private _sourceFile: TS.SourceFile;
    private _typeNode: TTypeNode;

    public get isSupported(): boolean {
        return this._isSupported;
    }

    protected get sourceFile(): TS.SourceFile {
        return this._sourceFile;
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
            kind: '',
            kindID: typeNode.kind,
            name: this.toString(),
            unsupportedNode: this.isSupported ?
                undefined :
                typeNode
        };
    }

    public toString(): string {
        return TS.getGeneratedNameForNode(this.typeNode).escapedText.toString();
    }
}

export interface TypeJSON extends JS.JSONObject {
    children?: Array<TypeJSON>;
    kind: string;
    kindID: TS.SyntaxKind;
    name?: string;
    unsupportedNode?: TS.TypeNode;
}

export default Type;
