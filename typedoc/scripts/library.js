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
const ChildProcess = __importStar(require("child_process"));
const Path = __importStar(require("path"));
const Process = __importStar(require("process"));
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
function debug(...infos) {
    if (exports.DEBUG_MODE) {
        info(...infos);
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
function exec(command, consoleOuput = true) {
    return new Promise((resolve, reject) => {
        info('Command start:', command);
        const childProcess = ChildProcess.exec(command, (error, stdout) => {
            if (error) {
                info(error);
                reject(error);
            }
            else {
                info('Command finished:', command);
                resolve(stdout);
            }
        });
        const stdout = childProcess.stdout;
        if (consoleOuput && stdout) {
            stdout.on('data', data => process.stdout.write(data));
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
function info(...infos) {
    Process.stdout.write('\n[' + (new Date()).toTimeString().substr(0, 8) + '] ' +
        infos.join(' ') + '\n');
}
exports.info = info;
