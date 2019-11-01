/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as T from './Types/index';
import TS from 'typescript';

export class TypesUtilities {

    /* *
     *
     *  Static Functions
     *
     * */

    public static loadFromChildren(
        sourceFile: TS.SourceFile,
        nodeChildren: (Array<TS.Node>|TS.NodeArray<TS.TypeNode>)
    ): Array<T.Type> {

        const typeChildren: Array<T.Type> = [];

        for (let nodeChild of nodeChildren) {
            if (TS.isTypeNode(nodeChild)) {
                typeChildren.push(
                    TypesUtilities.loadFromTypeNode(sourceFile, nodeChild)
                );
            }
        }

        return typeChildren;
    }

    public static loadFromTypeNode(
        sourceFile: TS.SourceFile,
        typeNode: TS.TypeNode
    ): T.Type {

        if (TS.isArrayTypeNode(typeNode)) {
            return new T.ArrayType(sourceFile, typeNode);
        }

        if (TS.isTypeReferenceNode(typeNode)) {
            return new T.ReferenceType(sourceFile, typeNode);
        }

        if (TS.isUnionTypeNode(typeNode)) {
            return new T.UnionType(sourceFile, typeNode);
        }

        if (T.PrimitiveType.isKeywordTypeNode(typeNode)) {
            return new T.PrimitiveType(sourceFile, typeNode);
        }

        return new T.Type(sourceFile, typeNode, true);
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor() {};
}

export default TypesUtilities;
