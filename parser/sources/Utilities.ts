/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import ChildProcess from 'child_process';
import Path from 'path';
import TypeScript from 'typescript';

/* *
 *
 *  Declarations
 *
 * */

export interface ExecResult {
    error: (ChildProcess.ExecException|null);
    stdout: string;
    stderr: string;
}

/* *
 *
 *  Functions
 *
 * */

export function absolute(
    ...paths: Array<string>
): string {
    return TypeScript.sys.resolvePath(Path.join(...paths));
}

export function exec(
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

export function firstLine(
    text: string,
    limit?: number
): string {
    text = text.split(lineBreakOf(text))[0];
    return (limit ? text.substring(0, limit) : text);
}

export function lineBreakOf(
    text: string
): ('\n'|'\r'|'\r\n') {
    if (text.includes('\r\n')) {
        return '\r\n';
    }
    if (text.includes('\r')) {
        return '\r';
    }
    return '\n';
}

export function relative(
    referencePath: string,
    ...paths: Array<string>
): string {
    return Path.relative(
        absolute(referencePath),
        Path.join(...paths)
    );
}

/* *
 *
 *  Default Export
 *
 * */

export default {
    absolute,
    exec,
    firstLine,
    lineBreakOf,
    relative
};
