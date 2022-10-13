"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const TypeScript = require("typescript");
const JSDoc_1 = require("./JSDoc");
const Utilities_1 = require("./Utilities");
/* *
 *
 *  Constants
 *
 * */
const DEBUG_SKIP = [
    'end',
    'parent',
    'pos'
];
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
    static parse(file, node) {
        const memberTypes = Member.types;
        let member;
        for (const type in memberTypes) {
            member = memberTypes[type].parse(file, node);
            if (member) {
                return member;
            }
        }
        return;
    }
    static parseChildren(file, node, debug) {
        const memberTypes = Member.types, children = [];
        let member;
        TypeScript.forEachChild(node, child => {
            member = Member.parse(file, child);
            if (member) {
                children.push(member);
            }
        });
        return children;
    }
    static register(MemberClass) {
        Member.types[MemberClass.name] = MemberClass;
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        const member = this;
        if (!member._children) {
            const memberFile = member.file;
            member._children = Member.parseChildren(memberFile, member.node, memberFile.project.debug);
        }
        return member._children;
    }
    getComment() {
        const member = this, fileNode = member.file.node, memberNode = member.node, triviaWidth = memberNode.getLeadingTriviaWidth(fileNode);
        if (!triviaWidth) {
            return;
        }
        return (memberNode
            .getFullText(fileNode)
            .substring(0, triviaWidth)
            .match(/[ \t]*\/\*\*.*\*\/[ \t]*/gsu) ||
            [])[0];
    }
    getCommentTags() {
        const member = this, fileNode = member.file.node, memberNode = member.node, nodeChildren = memberNode.getChildren(), commentTags = [];
        for (const child of nodeChildren) {
            if (!TypeScript.isJSDoc(child)) {
                break;
            }
            if (child.tags) {
                for (const tag of child.tags) {
                    commentTags.push({
                        tag: tag.tagName.getText(fileNode),
                        type: JSDoc_1.default.getTypeExpression(tag, fileNode),
                        name: JSDoc_1.default.getName(tag, fileNode),
                        text: JSDoc_1.default.getComment(tag, fileNode)
                    });
                }
            }
            else if (child.comment) {
                commentTags.push({
                    tag: 'description',
                    text: JSDoc_1.default.getComment(child, fileNode)
                });
            }
        }
        return commentTags;
    }
    getComments() {
        const member = this, fileNode = member.file.node, memberNode = member.node, triviaWidth = memberNode.getLeadingTriviaWidth(fileNode);
        if (!triviaWidth) {
            return;
        }
        return memberNode.getFullText(fileNode).substring(0, triviaWidth);
    }
    getDebug() {
        const member = this, debug = { kind: TypeScript.SyntaxKind.Unknown }, fileNode = member.file.node, memberNode = member.node;
        let property;
        for (const key in memberNode) {
            property = memberNode[key];
            if (key[0] === '_' ||
                DEBUG_SKIP.includes(key)) {
                continue;
            }
            switch (typeof property) {
                case 'boolean':
                case 'number':
                    debug[key] = property;
                    continue;
                case 'function':
                    if (key === 'getText') {
                        debug[key] = Utilities_1.default.firstLine(memberNode.getText(fileNode), 120);
                    }
                    continue;
                case 'undefined':
                    continue;
            }
            if (property &&
                typeof property === 'object' &&
                typeof property.getText === 'function') {
                debug[key] = Utilities_1.default.firstLine(property.getText(fileNode), 120);
            }
            else {
                debug[key] = Utilities_1.default.firstLine(`${property}`, 120);
            }
        }
        return debug;
    }
    getMeta() {
        const member = this, node = member.node;
        return {
            start: node.pos,
            end: node.end
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