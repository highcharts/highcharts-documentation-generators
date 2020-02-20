/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './Members/index';
import TS from 'typescript';

const IGNORED_SYNTAX_KIND = [
    TS.SyntaxKind.EndOfFileToken
];

const WRAPPED_SYNTAX_KIND = [
    TS.SyntaxKind.SyntaxList
];

export class MembersUtilities {

    /* *
     *
     *  Static Properties
     *
     * */

    private static memberCache: Array<M.Member> = [];

    private static nodeCache: Array<TS.Node> = [];

    /* *
     *
     *  Static Functions
     *
     * */

    public static loadFromCache(node: TS.Node): (M.Member|undefined) {

        const cachePosition = MembersUtilities.nodeCache.indexOf(node);

        if (cachePosition === -1) {
            return;
        }

        return MembersUtilities.memberCache[cachePosition];
    }

    public static loadFromNode(sourceFile: TS.SourceFile, node: TS.Node): (M.Member|undefined) {

        let member = MembersUtilities.loadFromCache(node);

        if (member) {
            return member;
        }

        if (IGNORED_SYNTAX_KIND.includes(node.kind)) {
            return;
        }

        if (TS.isBlock(node) || TS.isModuleBlock(node)) {
            member = new M.BlockMember(sourceFile, node);
        }

        if (TS.isBundle(node)) {
            member = new M.BundleMember(sourceFile, node);
        }

        if (TS.isExportAssignment(node) || TS.isExportDeclaration(node)) {
            member = new M.ExportMember(sourceFile, node);
        }

        if (TS.isIdentifier(node)) {
            member = new M.IdentifierMember(sourceFile, node);
        }

        if (TS.isImportDeclaration(node)) {
            member = new M.ImportMember(sourceFile, node);
        }

        if (TS.isJSDoc(node)) {
            member = new M.DocletMember(sourceFile, node);
        }

        if (TS.isLiteralTypeNode(node)) {
            member = new M.LiteralMember(sourceFile, node);
        }

        if (TS.isModuleDeclaration(node)) {
            member = new M.ModuleMember(sourceFile, node);
        }

        if (TS.isPropertyDeclaration(node)) {
            member = new M.PropertyMember(sourceFile, node);
        }

        if (TS.isSourceFile(node)) {
            member = new M.FileMember(node);
        }

        if (member) {
            MembersUtilities.saveToCache(node, member);
        }

        return member;
    }

    public static loadFromNodesChildren(sourceFile: TS.SourceFile, node: TS.Node): (M.Member|undefined) {

        const children = node.getChildren(sourceFile);

        if (!children.length) {
            return;
        }

        let childMember: (M.Member|undefined);
        let childNode: (TS.Node|undefined);

        while (
            (childNode = children.shift()) &&
            (
                !childMember ||
                childMember.isNotSupported
            )
        ) {
            childMember = MembersUtilities.loadFromNode(sourceFile, childNode);
        }

        return childMember;
    }

    public static loadNodeChildren(sourceFile: TS.SourceFile, nodeChildren: Array<TS.Node>): Array<M.Member> {

        const memberChildren: Array<M.Member> = [];

        let memberChild: (M.Member|undefined);

        for (let nodeChild of nodeChildren) {

            if (IGNORED_SYNTAX_KIND.includes(nodeChild.kind)) {
                continue;
            }

            memberChild = MembersUtilities.loadFromNode(sourceFile, nodeChild);

            if (!memberChild) {
                memberChildren.push(
                    ...MembersUtilities.loadNodeChildren(sourceFile, nodeChild.getChildren(sourceFile))
                );
            } else {
                memberChildren.push(memberChild);
            }
        }

        return memberChildren;
    }

    public static saveToCache(node: TS.Node, member: M.Member): void {

        if (MembersUtilities.loadFromCache(node)) {
            return;
        }

        MembersUtilities.nodeCache.push(node);
        MembersUtilities.memberCache.push(member);

    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor() {};
}

export default MembersUtilities;
