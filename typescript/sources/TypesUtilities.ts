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
        typeNode?: TS.TypeNode
    ): T.Type {

        if (typeof typeNode === 'undefined') {
            typeNode = TS.createKeywordTypeNode(TS.SyntaxKind.UndefinedKeyword);
        }

        if (T.UnionType.test(typeNode)) {
            return new T.UnionType(sourceFile, typeNode);
        }

        if (T.ReferenceType.test(typeNode)) {
            return new T.ReferenceType(sourceFile, typeNode);
        }

        if (T.PrimitiveType.test(typeNode)) {
            return new T.PrimitiveType(sourceFile, typeNode);
        }

        if (T.LiteralType.test(typeNode)) {
            return new T.LiteralType(sourceFile, typeNode);
        }

        if (TS.isParenthesizedTypeNode(typeNode)) {
            typeNode = typeNode.type;
        }

        if (T.ArrayType.test(typeNode)) {
            return new T.ArrayType(sourceFile, typeNode);
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
