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
    function extractTag(name: string, node: TypeScript.JSDoc, sourceFile: TypeScript.SourceFile): (TypeScript.JSDocTag | undefined);
    function extractTags(node: TypeScript.JSDoc, sourceFile: TypeScript.SourceFile): Array<TypeScript.JSDocTag>;
}
export default JSDoc;
