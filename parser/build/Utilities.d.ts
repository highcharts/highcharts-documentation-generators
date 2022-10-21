/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
/// <reference types="node" />
import * as ChildProcess from 'child_process';
import * as TypeScript from 'typescript';
export interface ExecResult {
    error: (ChildProcess.ExecException | null);
    stdout: string;
    stderr: string;
}
export declare function absolute(...paths: Array<string>): string;
export declare function exec(command: string, options: ChildProcess.ExecOptions): Promise<ExecResult>;
export declare function firstLine(text: string, limit?: number): string;
export declare function isModuleDeclaration(node: TypeScript.Node): node is TypeScript.ModuleDeclaration;
export declare function isNamespaceDeclaration(node: TypeScript.Node): node is TypeScript.NamespaceDeclaration;
export declare function lineBreakOf(text: string): ('\n' | '\r' | '\r\n');
export declare function relative(referencePath: string, ...paths: Array<string>): string;
declare const _default: {
    absolute: typeof absolute;
    exec: typeof exec;
    firstLine: typeof firstLine;
    lineBreakOf: typeof lineBreakOf;
    isModuleDeclaration: typeof isModuleDeclaration;
    isNamespaceDeclaration: typeof isNamespaceDeclaration;
    relative: typeof relative;
};
export default _default;
