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
exports.relative = exports.lineBreakOf = exports.exec = exports.absolute = void 0;
const child_process_1 = __importDefault(require("child_process"));
const path_1 = __importDefault(require("path"));
const typescript_1 = __importDefault(require("typescript"));
/* *
 *
 *  Functions
 *
 * */
function absolute(...paths) {
    return typescript_1.default.sys.resolvePath(path_1.default.join(...paths));
}
exports.absolute = absolute;
function exec(command, options) {
    return new Promise(resolve => child_process_1.default.exec(command, options, (error, stdout, stderr) => resolve({ error, stdout, stderr })));
}
exports.exec = exec;
function lineBreakOf(text) {
    if (text.indexOf('\r\n')) {
        return '\r\n';
    }
    if (text.indexOf('\r')) {
        return '\r';
    }
    return '\n';
}
exports.lineBreakOf = lineBreakOf;
function relative(referencePath, ...paths) {
    return path_1.default.relative(absolute(referencePath), path_1.default.join(...paths));
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
    lineBreakOf,
    relative
};
//# sourceMappingURL=Utilities.js.map