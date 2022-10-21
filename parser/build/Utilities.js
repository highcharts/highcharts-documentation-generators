"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
Object.defineProperty(exports, "__esModule", { value: true });
exports.relative = exports.lineBreakOf = exports.isNamespaceDeclaration = exports.isModuleDeclaration = exports.firstLine = exports.exec = exports.absolute = void 0;
const ChildProcess = require("child_process");
const Path = require("path");
const TypeScript = require("typescript");
/* *
 *
 *  Functions
 *
 * */
function absolute(...paths) {
    return TypeScript.sys.resolvePath(Path.join(...paths));
}
exports.absolute = absolute;
function exec(command, options) {
    return new Promise(resolve => ChildProcess.exec(command, options, (error, stdout, stderr) => resolve({ error, stdout, stderr })));
}
exports.exec = exec;
function firstLine(text, limit) {
    text = text.split(lineBreakOf(text))[0];
    return (limit ? text.substring(0, limit) : text);
}
exports.firstLine = firstLine;
function isModuleDeclaration(node) {
    return (TypeScript.isModuleDeclaration(node) &&
        !isNamespaceDeclaration(node));
}
exports.isModuleDeclaration = isModuleDeclaration;
function isNamespaceDeclaration(node) {
    return (TypeScript.isModuleDeclaration(node) &&
        !!node.name.escapedText);
}
exports.isNamespaceDeclaration = isNamespaceDeclaration;
function lineBreakOf(text) {
    if (text.includes('\r\n')) {
        return '\r\n';
    }
    if (text.includes('\r')) {
        return '\r';
    }
    return '\n';
}
exports.lineBreakOf = lineBreakOf;
function relative(referencePath, ...paths) {
    return Path.relative(absolute(referencePath), Path.join(...paths));
}
exports.relative = relative;
/* *
 *
 *  Default Export
 *
 * */
exports.default = {
    absolute,
    exec,
    firstLine,
    lineBreakOf,
    isModuleDeclaration,
    isNamespaceDeclaration,
    relative
};
//# sourceMappingURL=Utilities.js.map