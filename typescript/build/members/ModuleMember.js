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
const typescript_1 = __importDefault(require("typescript"));
const Member_1 = __importDefault(require("../Member"));
const ModuleDeclarationKind = typescript_1.default.SyntaxKind.ModuleDeclaration;
const SourceFileKind = typescript_1.default.SyntaxKind.SourceFile;
class ModuleMember extends Member_1.default {
    /* *
     *
     *  Functions
     *
     * */
    toJSON() {
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
        return;
    }
}
exports.ModuleMember = ModuleMember;
exports.default = ModuleMember;
