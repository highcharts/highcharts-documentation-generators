/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import TypeScript from 'typescript';
declare namespace JSDoc {
    function extractComment(node: TypeScript.Node, sourceFile: TypeScript.SourceFile): (string | undefined);
    function extractDoclets(node: TypeScript.Node, sourceFile: TypeScript.SourceFile): Array<TypeScript.JSDoc>;
    function extractSimpleComment(node: TypeScript.Node, sourceFile: TypeScript.SourceFile, ignoreChildren?: boolean): (string | undefined);
}
export default JSDoc;
