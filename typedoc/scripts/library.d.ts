/**
 * Executes a command
 *
 * @param command
 *        Command to execute
 */
export declare function exec(command: string): Promise<string>;
/**
 * Writes information into the console
 *
 * @param infos
 *        One or more items with information
 */
export declare function info(...infos: Array<any>): void;
