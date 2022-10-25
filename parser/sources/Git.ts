/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import U from './Utilities';

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
        const result = await U.exec('git rev-parse --abbrev-ref HEAD', { cwd });

        if (result.error) {
            throw result.error;
        }

        return result.stdout.trim();
    }

    /**
     * Returns the last commit of the given folder.
     */
    export async function getLastCommit(
        cwd: string
    ): Promise<string> {
        const result = await U.exec('git rev-parse --short HEAD', { cwd });

        if (result.error) {
            throw result.error;
        }

        return result.stdout.trim();
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Git;
