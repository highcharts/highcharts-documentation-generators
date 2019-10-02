"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const Members = __importStar(require("./Members/index"));
class MemberUtilities {
    /* *
     *
     *  Static Functions
     *
     * */
    static load(node) {
        if (typescript_1.default.isModuleDeclaration(node) || typescript_1.default.isSourceFile(node)) {
            return new Members.ModuleMember(node);
        }
        if (typescript_1.default.isBlock(node) || typescript_1.default.isModuleBlock(node)) {
            return new Members.BlockMember(node);
        }
        return;
    }
}
exports.MemberUtilities = MemberUtilities;
exports.default = MemberUtilities;
