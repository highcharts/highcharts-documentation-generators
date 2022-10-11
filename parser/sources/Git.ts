/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import ChildProcess from 'child_process';

/* *
 *
 *  Namespace
 *
 * */

export namespace Git {

    /* *
     *
     *  Declarations
     *
     * */

    interface ExecResult {
        error: (ChildProcess.ExecException|null);
        stdout: string;
        stderr: string;
    }

    /* *
     *
     *  Functions
     *
     * */

    async function exec(
        command: string,
        options: ChildProcess.ExecOptions
    ): Promise<ExecResult> {
        return new Promise(resolve =>
            ChildProcess.exec(
                command,
                options,
                (error, stdout, stderr) => resolve({ error, stdout, stderr})
            )
        );
    }

    /**
     * Returns the active branch of the given folder.
     */
    export async function getActiveBranch(
        cwd: string
    ): Promise<string> {
        return exec('git rev-parse --abbrev-ref HEAD', { cwd })
            .then(result => {
                if (result.error) {
                    throw result.error;
                }

                return result.stdout.trim();
            });
    }

    /**
     * Returns the last commit of the given folder.
     */
    export async function getLastCommit(
        cwd: string
    ): Promise<string> {
        return exec('git rev-parse --short HEAD', { cwd })
            .then(result => {
                if (result.error) {
                    throw result.error;
                }

                return result.stdout.trim();
            });
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Git;
