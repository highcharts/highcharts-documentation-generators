/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import type JSON from './JSON';
import TypeScript from 'typescript';
declare namespace Utilities {
    type Extractor<T> = (node: TypeScript.Node, sourceFile: TypeScript.SourceFile, ignoreChildren?: boolean) => T;
    export interface Meta extends JSON.Object {
        start: number;
        startLine: number;
        startColumn: number;
        end: number;
        endLine: number;
        endColumn: number;
    }
    export function extractMeta(node: TypeScript.Node, sourceFile: TypeScript.SourceFile): Meta;
    export function extractInChildren<T>(node: TypeScript.Node, sourceFile: TypeScript.SourceFile, extractor: Extractor<T>): (T | undefined);
    export {};
}
export default Utilities;
