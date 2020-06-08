/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as T from './index';
import TS from 'typescript';
import TypesUtilities from '../TypesUtilities';

export class UnionType extends T.Type<TS.UnionTypeNode> {

    /* *
     *
     *  Static Functions
     *
     * */

    public static test(node: TS.Node): node is TS.UnionTypeNode {
        return TS.isUnionTypeNode(node);
    }

    /* *
     *
     *  Functions
     *
     * */

    public getChildren(): Array<T.Type> {

        const sourceFile = this.sourceFile;
        const typeChildren: Array<T.Type> = [];
        const typeNodes = this.typeNode.types;

        let typeChild: T.Type;

        for (let typeNode of typeNodes) {

            typeChild = TypesUtilities.loadFromTypeNode(sourceFile, typeNode);

            if (typeChild.isSupported) {
                typeChildren.push(typeChild);
            }
            else {
                typeChildren.push(...typeChild.getChildren());
            }
        }

        return typeChildren;
    }

    public toJSON(): UnionTypeJSON {
        
        const superJSON = super.toJSON();

        return {
            children: superJSON.children,
            kind: 'union',
            kindID: superJSON.kindID
        };
    }

    public toString(): string {
        return this.typeNode.types.join('|');
    }
}

export interface UnionTypeJSON extends T.TypeJSON {
    kind: 'union';
}

export default UnionType;
