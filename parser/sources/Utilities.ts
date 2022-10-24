/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as ChildProcess from 'child_process';
import * as Path from 'path';
import * as TypeScript from 'typescript';

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

export function getStringArray(
    fileNode: TypeScript.SourceFile,
    children: (Array<TypeScript.Node>|TypeScript.NodeArray<TypeScript.Node>)
): Array<string>|undefined {
    const result: Array<string> = [];

    for (const child of children) {
        result.push(child.getText(fileNode));
    }

    return result;
}

export function isModuleDeclaration(
    node: TypeScript.Node
): node is TypeScript.ModuleDeclaration {
    return (
        TypeScript.isModuleDeclaration(node) &&
        !isNamespaceDeclaration(node)
    );
}

export function isNamespaceDeclaration(
    node: TypeScript.Node
): node is TypeScript.NamespaceDeclaration {
    return (
        TypeScript.isModuleDeclaration(node) &&
        !!(node.name as TypeScript.Identifier).escapedText
    );
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
    getStringArray,
    isModuleDeclaration,
    isNamespaceDeclaration,
    lineBreakOf,
    relative
};
