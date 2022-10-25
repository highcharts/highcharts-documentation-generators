/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import TypeScript from 'typescript';
declare namespace MemberUtilities {
    function extractFirstLine(node: TypeScript.Node, sourceFile: TypeScript.SourceFile): (string | undefined);
    function extractKeyword(node: TypeScript.Node, sourceFile: TypeScript.SourceFile, ignoreChildren?: boolean): (string | undefined);
    function extractModifiers(node: (TypeScript.ModifiersArray | TypeScript.Node), sourceFile: TypeScript.SourceFile): (Array<string> | undefined);
    function extractSyntax(node: TypeScript.Node, sourceFile: TypeScript.SourceFile, ignoreChildren?: boolean): (Array<string> | undefined);
}
export default MemberUtilities;
