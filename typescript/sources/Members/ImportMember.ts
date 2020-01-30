/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './Member';
import TS from 'typescript';

export class ImportMember extends M.Member<TS.ImportDeclaration> {

    /* *
     *
     *  Functions
     *
     * */

    public getBinding(): (string|undefined) {
        return this.node.importClause?.name?.getText(this.sourceFile);
    }

    public getBindings(): (Array<string>|undefined) {

        const sourceFile = this.sourceFile;
        const importClause = this.node.importClause;
        const bindingNodes = importClause?.namedBindings?.getChildren(sourceFile);

        if (
            typeof importClause === 'undefined' ||
            typeof bindingNodes === 'undefined'
        ) {
            return;
        }

        const bindings: Array<string> = [];

        for (let bindingNode of bindingNodes) {
            bindings.push(bindingNode.getText(sourceFile));
        }

        if (bindings.length === 0) {
            return;
        }

        return bindings;
    }

    public toJSON(): ImportMemberJSON {

        const sourceFile = this.sourceFile;
        const superJSON = super.toJSON();

        return {
            binding: this.getBinding(),
            bindings: this.getBindings(),
            kind: 'import',
            kindID: superJSON.kindID,
            source: this.node.moduleSpecifier.getText(sourceFile)
        };
    }
}

export interface ImportMemberJSON extends M.MemberJSON {
    binding?: string;
    bindings?: Array<string>;
    kind: 'import';
    source: string;
}

export default ImportMember;
