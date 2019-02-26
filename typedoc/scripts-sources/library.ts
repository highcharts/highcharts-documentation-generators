/*
 * Copyright (C) Highsoft AS
 */

import * as ChildProcess from 'child_process';
import * as Process from 'process';

/**
 * Executes a command
 *
 * @param command 
 *        Command to execute
 */
export function exec (command: string): Promise<string> {

    return new Promise((resolve, reject) => {

        info('Command start:', command);

        ChildProcess
            .exec(command, (error, stdout) => {
                if (error) {
                    info(error);
                    reject(error);
                } else {
                    info('Command finished:', command);
                    resolve(stdout);
                }
            })
            .stdout.on('data', info);
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
        '\n[' + (new Date()).toString().substr(0, 8) + '] ' +
        infos.join(' ') + '\n'
    );
}
