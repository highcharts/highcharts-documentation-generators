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
const Project_1 = __importDefault(require("./Project"));
const typescript_1 = __importDefault(require("typescript"));
class MembersUtilities {
    /* *
     *
     *  Static Functions
     *
     * */
    static loadFromArguments(args) {
        const parsedCommandLine = typescript_1.default.parseCommandLine(args);
        return new Project_1.default(typescript_1.default.createProgram(parsedCommandLine.fileNames, parsedCommandLine.options));
    }
    static loadFromDirectory(directoryPath) {
        const tsConfig = typescript_1.default.readJsonConfigFile(typescript_1.default.sys.resolvePath(directoryPath), typescript_1.default.sys.readFile);
        const parsedCommandLine = typescript_1.default.parseJsonConfigFileContent(tsConfig, typescript_1.default.sys, directoryPath);
        const project = new Project_1.default(typescript_1.default.createProgram(parsedCommandLine.fileNames, parsedCommandLine.options));
        project.directoryPath = directoryPath;
        return project;
    }
    static loadFromNode(sourceFile, node) {
        if (typescript_1.default.isBundle(node)) {
            return new M.BundleMember(sourceFile, node);
        }
        if (typescript_1.default.isSourceFile(node)) {
            return new M.FileMember(node);
        }
        if (typescript_1.default.isModuleDeclaration(node)) {
            return new M.ModuleMember(sourceFile, node);
        }
        if (typescript_1.default.isExportAssignment(node) || typescript_1.default.isExportDeclaration(node)) {
            return new M.ExportMember(sourceFile, node);
        }
        if (typescript_1.default.isBlock(node) || typescript_1.default.isModuleBlock(node)) {
            return new M.BlockMember(sourceFile, node);
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
