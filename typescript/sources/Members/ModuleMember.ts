/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import TS from 'typescript';
import Member from '../Member';

const ModuleDeclarationKind = TS.SyntaxKind.ModuleDeclaration;
const SourceFileKind = TS.SyntaxKind.SourceFile;

export class ModuleMember extends Member<(TS.ModuleDeclaration|TS.SourceFile)> {

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(): (object|undefined) {

        const node = this.node;

        if (typeof node === 'undefined') {
            return;
        }

        switch (node.kind) {
            case ModuleDeclarationKind:
                return {
                    children: this.getChildren(),
                    kind: 'module',
                    name: node.name
                };
            case SourceFileKind:
                return {
                    children: this.getChildren(),
                    kind: 'file',
                    name: node.fileName
                };
        }

        return ;
    }
}

export default ModuleMember;
