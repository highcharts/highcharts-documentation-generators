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
class MembersUtilities {
    /* *
     *
     *  Static Functions
     *
     * */
    static loadFromNode(sourceFile, node) {
        if (typescript_1.default.isBlock(node) || typescript_1.default.isModuleBlock(node)) {
            return new M.BlockMember(sourceFile, node);
        }
        if (typescript_1.default.isBundle(node)) {
            return new M.BundleMember(sourceFile, node);
        }
        if (typescript_1.default.isExportAssignment(node) || typescript_1.default.isExportDeclaration(node)) {
            return new M.ExportMember(sourceFile, node);
        }
        if (typescript_1.default.isJSDoc(node)) {
            return new M.DocletMember(sourceFile, node);
        }
        if (typescript_1.default.isLiteralTypeNode(node)) {
            return new M.LiteralMember(sourceFile, node);
        }
        if (typescript_1.default.isModuleDeclaration(node)) {
            return new M.ModuleMember(sourceFile, node);
        }
        if (typescript_1.default.isPropertyDeclaration(node)) {
            return new M.PropertyMember(sourceFile, node);
        }
        if (typescript_1.default.isSourceFile(node)) {
            return new M.FileMember(node);
        }
        return new M.Member(sourceFile, node, false);
    }
    /* *
     *
     *  Constructor
     *
     * */
    constructor() { }
    ;
}
exports.MembersUtilities = MembersUtilities;
exports.default = MembersUtilities;
