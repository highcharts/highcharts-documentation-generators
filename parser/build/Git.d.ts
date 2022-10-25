/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
export declare namespace Git {
    /**
     * Returns the active branch of the given folder.
     */
    function getActiveBranch(cwd: string): Promise<string>;
    /**
     * Returns the last commit of the given folder.
     */
    function getLastCommit(cwd: string): Promise<string>;
}
export default Git;
