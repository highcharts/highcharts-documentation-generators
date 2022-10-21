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
        node.modifiers;
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
    static parseChildren(file, node) {
        const children = (TypeScript.isClassLike(node) ||
            TypeScript.isEnumDeclaration(node) ||
            TypeScript.isInterfaceDeclaration(node) ? node.members :
            TypeScript.isBlock(node) ? node.statements :
                node.getChildren(file.node));
        const members = [];
        let member;
        for (const child of children) {
            if (Member.skip.includes(child.kind)) {
                continue;
            }
            member = Member.parse(file, child);
            if (member) {
                members.push(member);
            }
            // else if (TypeScript.isBlock(child)) {
            //     children.push(...Member.parseChildren(file, child));
            // }
        }
        return members;
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
            member._children = Member.parseChildren(member.file, member.node);
        }
        return member._children;
    }
    getComment() {
        const member = this;
        const fileNode = member.file.node;
        const memberNode = member.node;
        const triviaWidth = memberNode.getLeadingTriviaWidth(fileNode);
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
        const member = this;
        const fileNode = member.file.node;
        const memberNode = member.node;
        const nodeChildren = memberNode.getChildren();
        const commentTags = [];
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
        const member = this;
        const fileNode = member.file.node;
        const memberNode = member.node;
        const triviaWidth = memberNode.getLeadingTriviaWidth(fileNode);
        if (!triviaWidth) {
            return;
        }
        return memberNode.getFullText(fileNode).substring(0, triviaWidth);
    }
    getDebug() {
        const member = this;
        const debug = { kind: TypeScript.SyntaxKind.Unknown };
        const fileNode = member.file.node;
        const memberNode = member.node;
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
    getDecorators() {
        const member = this;
        const node = member.node;
        member._decorators = member._decorators || (TypeScript.canHaveDecorators(node) &&
            TypeScript.getDecorators(node) ||
            undefined);
        return member._decorators;
    }
    getMeta() {
        const member = this;
        const node = member.node;
        return {
            start: node.pos,
            end: node.end
        };
    }
    getModifiers() {
        const member = this;
        const node = member.node;
        member._modifiers = member._modifiers || (TypeScript.canHaveModifiers(node) &&
            TypeScript.getModifiers(node) ||
            undefined);
        return member._modifiers;
    }
}
exports.Member = Member;
/* *
 *
 *  Static Properties
 *
 * */
Member.skip = [
    TypeScript.SyntaxKind.EndOfFileToken
];
Member.types = {};
/* *
 *
 *  Default Export
 *
 * */
exports.default = Member;
//# sourceMappingURL=Member.js.map