"use strict";
/*
 * Copyright (C) Highsoft AS
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = exports.exec = exports.debug = exports.PWD = exports.DEBUG_MODE = exports.CWD = void 0;
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
