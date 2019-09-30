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
}
exports.NamespaceMember = NamespaceMember;
exports.default = NamespaceMember;
