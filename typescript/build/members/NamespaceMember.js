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
const Member_1 = __importDefault(require("./Member"));
class NamespaceMember extends Member_1.default {
    /* *
     *
     *  Constructor
     *
     * */
    constructor() {
        super();
    }
    /* *
     *
     *  Functions
     *
     * */
    getChildren() {
        return [];
    }
    loadNode(node, isTest = false) {
        if (!typescript_1.default.isBlock(node) &&
            !typescript_1.default.isModuleBlock(node) &&
            !typescript_1.default.isSourceFile(node)) {
            return false;
        }
        if (isTest === false) {
            this._node = node;
        }
        return true;
    }
    toJSON() {
        const node = this._node;
        if (typeof node === 'undefined') {
            return;
        }
        if (typescript_1.default.isBlock(node)) {
            return {
                children: this.getChildren(),
                name: node.getSourceFile.name
            };
        }
        if (typescript_1.default.isModuleBlock(node)) {
            return {
                children: this.getChildren(),
                name: node.parent.name
            };
        }
        return {
            children: this.getChildren(),
            name: node.moduleName,
        };
    }
}
exports.NamespaceMember = NamespaceMember;
exports.default = NamespaceMember;
