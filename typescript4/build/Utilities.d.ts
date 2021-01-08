/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import TypeScript from 'typescript';
declare namespace Utilities {
    type Extractor<T> = (node: TypeScript.Node, sourceFile: TypeScript.SourceFile, ignoreChildren?: boolean) => T;
    export function extractInChildren<T>(node: TypeScript.Node, sourceFile: TypeScript.SourceFile, extractor: Extractor<T>): (T | undefined);
    export {};
}
export default Utilities;
