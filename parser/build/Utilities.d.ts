/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
/// <reference types="node" />
import ChildProcess from 'child_process';
export interface ExecResult {
    error: (ChildProcess.ExecException | null);
    stdout: string;
    stderr: string;
}
export declare function absolute(...paths: Array<string>): string;
export declare function exec(command: string, options: ChildProcess.ExecOptions): Promise<ExecResult>;
export declare function lineBreakOf(text: string): ('\n' | '\r' | '\r\n');
export declare function relative(referencePath: string, ...paths: Array<string>): string;
declare const _default: {
    absolute: typeof absolute;
    exec: typeof exec;
    lineBreakOf: typeof lineBreakOf;
    relative: typeof relative;
};
export default _default;
