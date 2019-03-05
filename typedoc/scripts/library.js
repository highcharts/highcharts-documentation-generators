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
const Process = __importStar(require("process"));
/**
 * Executes a command
 *
 * @param command
 *        Command to execute
 */
function exec(command) {
    return new Promise((resolve, reject) => {
        info('Command start:', command);
        ChildProcess
            .exec(command, (error, stdout) => {
            if (error) {
                info(error);
                reject(error);
            }
            else {
                info('Command finished:', command);
                resolve(stdout);
            }
        })
            .stdout.on('data', info);
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
    Process.stdout.write('\n[' + (new Date()).toString().substr(0, 8) + '] ' +
        infos.join(' ') + '\n');
}
exports.info = info;
