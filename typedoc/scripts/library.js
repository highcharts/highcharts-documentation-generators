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
var Process = __importStar(require("process"));
/**
 * Executes a command
 *
 * @param command
 *        Command to execute
 */
function exec(command) {
    return new Promise(function (resolve, reject) {
        info('Command start:', command);
        ChildProcess
            .exec(command, function (error, stdout) {
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
function info() {
    var infos = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        infos[_i] = arguments[_i];
    }
    Process.stdout.write('\n[' + (new Date()).toString().substr(0, 8) + '] ' +
        infos.join(' ') + '\n');
}
exports.info = info;
