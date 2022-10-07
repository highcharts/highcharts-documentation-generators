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
     *  Functions
     *
     * */

    /**
     * Returns the active branch of the given folder.
     */
    export async function getActiveBranch(
        cwd: string
    ): Promise<string> {
        return await ChildProcess.exec(
            'git rev-parse --abbrev-ref HEAD',
            { cwd }
        ).toString().trim();
    }

    /**
     * Returns the last commit of the given folder.
     */
    export async function getLastCommit(
        cwd: string
    ): Promise<string> {
        return await ChildProcess.exec(
            'git rev-parse --short HEAD',
            { cwd }
        ).toString().trim();
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Git;
