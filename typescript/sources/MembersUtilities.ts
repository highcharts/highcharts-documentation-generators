/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './Members/index';
import TS from 'typescript';

export class MembersUtilities {

    /* *
     *
     *  Static Functions
     *
     * */

    public static loadFromNode(
        sourceFile: TS.SourceFile,
        node: TS.Node
    ): M.Member {

        if (TS.isBlock(node) || TS.isModuleBlock(node)) {
            return new M.BlockMember(sourceFile, node);
        }

        if (TS.isBundle(node)) {
            return new M.BundleMember(sourceFile, node);
        }

        if (TS.isExportAssignment(node) || TS.isExportDeclaration(node)) {
            return new M.ExportMember(sourceFile, node);
        }

        if (TS.isIdentifier(node)) {
            return new M.IdentifierMember(sourceFile, node);
        }

        if (TS.isImportDeclaration(node)) {
            return new M.ImportMember(sourceFile, node);
        }

        if (TS.isJSDoc(node)) {
            return new M.DocletMember(sourceFile, node);
        }

        if (TS.isLiteralTypeNode(node)) {
            return new M.LiteralMember(sourceFile, node);
        }

        if (TS.isModuleDeclaration(node)) {
            return new M.ModuleMember(sourceFile, node);
        }

        if (TS.isPropertyDeclaration(node)) {
            return new M.PropertyMember(sourceFile, node);
        }

        if (TS.isSourceFile(node)) {
            return new M.FileMember(node);
        }

        return new M.Member(sourceFile, node, true);
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor() {};
}

export default MembersUtilities;
