"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const typescript_1 = __importDefault(require("typescript"));
/* *
 *
 *  Class
 *
 * */
class Member {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(file, node) {
        this.file = file;
        this.node = node;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    static parse(_file, _node) {
        return;
    }
    static parseChildren(file, node, debug) {
        const children = [], memberTypes = Member.types;
        let childMember;
        typescript_1.default.forEachChild(node, child => {
            for (const member in memberTypes) {
                childMember = memberTypes[member].parse(file, child);
                if (childMember) {
                    children.push(childMember);
                    break;
                }
            }
        });
        return children;
    }
    static register(MemberClass) {
        Member.types[MemberClass.name] = MemberClass;
    }
    get nodeText() {
        const member = this;
        if (typeof member._nodeText === 'undefined') {
            member._nodeText = member.node.getText(member.file.node);
        }
        return member._nodeText;
    }
    get sourceText() {
        const member = this;
        if (typeof member._sourceText === 'undefined') {
            member._sourceText = member.node.getFullText(member.file.node);
        }
        return member._sourceText;
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        const member = this, memberFile = member.file;
        return Member.parseChildren(memberFile, member.node, memberFile.project.debug);
    }
    getComment() {
        const member = this, nodeText = member.nodeText, sourceText = member.sourceText;
        return (sourceText
            .substring(0, sourceText.length - nodeText.length)
            .match(/[ \t]*\/\*.*\*\/[ \t]*/gmsu) ||
            [])[0];
    }
    toJSON(skipChildren) {
        const member = this, node = member.node, file = member.file, children = (skipChildren ?
            undefined :
            Member
                .parseChildren(file, node)
                .map(child => child.toJSON()));
        return {
            kind: typescript_1.default.SyntaxKind[node.kind],
            comment: (member.getComment() || undefined),
            children
        };
    }
}
exports.Member = Member;
/* *
 *
 *  Static Properties
 *
 * */
Member.types = {};
/* *
 *
 *  Default Export
 *
 * */
exports.default = Member;
//# sourceMappingURL=Member.js.map