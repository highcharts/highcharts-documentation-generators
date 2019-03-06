/**
 * Current working directory
 */
export declare const CWD: string;
/**
 * Debug mode
 */
export declare const DEBUG_MODE: boolean;
/**
 * Package working directory
 */
export declare const PWD: string;
/**
 * Writes information into the console if debug mode is active.
 *
 * @param infos
 *        One or more items with information
 */
export declare function debug(...infos: Array<any>): void;
/**
 * Executes a command
 *
 * @param command
 *        Command to execute
 *
 * @param consoleOutput
 *        True to have console output
 */
export declare function exec(command: string, consoleOuput?: boolean): Promise<string>;
/**
 * Writes information into the console
 *
 * @param infos
 *        One or more items with information
 */
export declare function info(...infos: Array<any>): void;
