"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const M = __importStar(require("./Members/index"));
const typescript_1 = __importDefault(require("typescript"));
const IGNORED_SYNTAX_KIND = [
    typescript_1.default.SyntaxKind.EndOfFileToken
];
const WRAPPED_SYNTAX_KIND = [
    typescript_1.default.SyntaxKind.SyntaxList
];
class MembersUtilities {
    /* *
     *
     *  Constructor
     *
     * */
    constructor() {
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static loadFromCache(node) {
        const cachePosition = MembersUtilities.nodeCache.indexOf(node);
        if (cachePosition === -1) {
            return;
        }
        return MembersUtilities.memberCache[cachePosition];
    }
    static loadFromNode(sourceFile, node) {
        let member = MembersUtilities.loadFromCache(node);
        if (member) {
            return member;
        }
        if (IGNORED_SYNTAX_KIND.includes(node.kind)) {
            return;
        }
        if (typescript_1.default.isBlock(node) || typescript_1.default.isModuleBlock(node)) {
            member = new M.BlockMember(sourceFile, node);
        }
        if (typescript_1.default.isBundle(node)) {
            member = new M.BundleMember(sourceFile, node);
        }
        if (typescript_1.default.isExportAssignment(node) || typescript_1.default.isExportDeclaration(node)) {
            member = new M.ExportMember(sourceFile, node);
        }
        if (typescript_1.default.isIdentifier(node)) {
            member = new M.IdentifierMember(sourceFile, node);
        }
        if (typescript_1.default.isImportDeclaration(node)) {
            member = new M.ImportMember(sourceFile, node);
        }
        if (typescript_1.default.isJSDoc(node)) {
            member = new M.DocletMember(sourceFile, node);
        }
        if (typescript_1.default.isLiteralTypeNode(node)) {
            member = new M.LiteralMember(sourceFile, node);
        }
        if (typescript_1.default.isModuleDeclaration(node)) {
            member = new M.ModuleMember(sourceFile, node);
        }
        if (typescript_1.default.isPropertyDeclaration(node)) {
            member = new M.PropertyMember(sourceFile, node);
        }
        if (typescript_1.default.isSourceFile(node)) {
            member = new M.FileMember(node);
        }
        if (member) {
            MembersUtilities.saveToCache(node, member);
        }
        return member;
    }
    static loadFromNodesChildren(sourceFile, node) {
        const children = node.getChildren(sourceFile);
        if (!children.length) {
            return;
        }
        let childMember;
        let childNode;
        while ((childNode = children.shift()) &&
            (!childMember ||
                childMember.isNotSupported)) {
            childMember = MembersUtilities.loadFromNode(sourceFile, childNode);
        }
        return childMember;
    }
    static loadNodeChildren(sourceFile, nodeChildren) {
        const memberChildren = [];
        let memberChild;
        for (let nodeChild of nodeChildren) {
            if (IGNORED_SYNTAX_KIND.includes(nodeChild.kind)) {
                continue;
            }
            memberChild = MembersUtilities.loadFromNode(sourceFile, nodeChild);
            if (!memberChild) {
                memberChildren.push(...MembersUtilities.loadNodeChildren(sourceFile, nodeChild.getChildren(sourceFile)));
            }
            else {
                memberChildren.push(memberChild);
            }
        }
        return memberChildren;
    }
    static saveToCache(node, member) {
        if (MembersUtilities.loadFromCache(node)) {
            return;
        }
        MembersUtilities.nodeCache.push(node);
        MembersUtilities.memberCache.push(member);
    }
    ;
}
exports.MembersUtilities = MembersUtilities;
/* *
 *
 *  Static Properties
 *
 * */
MembersUtilities.memberCache = [];
MembersUtilities.nodeCache = [];
exports.default = MembersUtilities;
