"use strict";
/*
 * Copyright (C) Highsoft AS
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ChildProcess = __importStar(require("child_process"));
var Path = __importStar(require("path"));
var Process = __importStar(require("process"));
/* *
 *
 *  Constants
 *
 * */
/**
 * Current working directory
 */
exports.CWD = process.cwd();
/**
 * Debug mode
 */
exports.DEBUG_MODE = !!Process.env.DEBUG;
/**
 * Package working directory
 */
exports.PWD = Path.join(__dirname, '../../');
/* *
 *
 *  Functions
 *
 * */
/**
 * Writes information into the console if debug mode is active.
 *
 * @param infos
 *        One or more items with information
 */
function debug() {
    var infos = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        infos[_i] = arguments[_i];
    }
    if (exports.DEBUG_MODE) {
        info.apply(void 0, infos);
    }
}
exports.debug = debug;
/**
 * Executes a command
 *
 * @param command
 *        Command to execute
 *
 * @param consoleOutput
 *        True to have console output
 */
function exec(command, consoleOuput) {
    if (consoleOuput === void 0) { consoleOuput = true; }
    return new Promise(function (resolve, reject) {
        info('Command start:', command);
        var childProcess = ChildProcess.exec(command, function (error, stdout) {
            if (error) {
                info(error);
                reject(error);
            }
            else {
                info('Command finished:', command);
                resolve(stdout);
            }
        });
        if (consoleOuput) {
            childProcess.stdout.on('data', function (data) { return process.stdout.write(data); });
        }
    });
}
exports.exec = exec;
/**
 * Writes information into the console
 *
 * @param infos
 *        One or more items with information
 */
function info() {
    var infos = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        infos[_i] = arguments[_i];
    }
    Process.stdout.write('\n[' + (new Date()).toTimeString().substr(0, 8) + '] ' +
        infos.join(' ') + '\n');
}
exports.info = info;
