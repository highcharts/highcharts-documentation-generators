/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './';
import TS from 'typescript';

export class ClassMember extends M.Member<(TS.ClassDeclaration|TS.ClassElement|TS.ClassExpression)> {

    /* *
     *
     *  Static Functions
     *
     * */

    public static test(node: TS.Node): node is (TS.ClassDeclaration|TS.ClassElement|TS.ClassExpression) {
        return (
            TS.isClassDeclaration(node) ||
            TS.isClassElement(node) ||
            TS.isClassExpression(node)
        );
    }

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): ClassMemberJSON {

        const node = this.node;
        const sourceFile = this.sourceFile;
        const superJSON = super.toJSON();

        return {
            children: (superJSON.children || []),
            kind: 'class',
            kindID: superJSON.kindID,
            name: (node.name && node.name.getText(sourceFile) || '')
        };
    }
}

export interface ClassMemberJSON extends M.MemberJSON {
    children: Array<M.MemberJSON>;
    kind: 'class';
    name: string;
}

export default ClassMember;
