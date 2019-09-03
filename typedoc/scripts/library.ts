/*
 * Copyright (C) Highsoft AS
 */

import * as ChildProcess from 'child_process';
import * as Path from 'path';
import * as Process from 'process';

/* *
 *
 *  Constants
 *
 * */

/**
 * Current working directory
 */
export const CWD = process.cwd();

/**
 * Debug mode
 */
export const DEBUG_MODE = !!Process.env.DEBUG;

/**
 * Package working directory
 */
export const PWD = Path.join(__dirname, '../../');

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
export function debug (...infos: Array<any>) {

    if (DEBUG_MODE) {
        info(...infos);
    }
}

/**
 * Executes a command
 *
 * @param command 
 *        Command to execute
 *
 * @param consoleOutput
 *        True to have console output
 */
export function exec (
    command: string, consoleOuput: boolean = true
): Promise<string> {

    return new Promise((resolve, reject) => {

        info('Command start:', command);

        const childProcess = ChildProcess.exec(command, (error, stdout) => {
            if (error) {
                info(error);
                reject(error);
            } else {
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

/**
 * Writes information into the console
 *
 * @param infos
 *        One or more items with information
 */
export function info (...infos: Array<any>) {

    Process.stdout.write(
        '\n[' + (new Date()).toTimeString().substr(0, 8) + '] ' +
        infos.join(' ') + '\n'
    );
}
