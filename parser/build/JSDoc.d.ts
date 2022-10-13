/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as TypeScript from 'typescript';
export declare function getComment(node: (TypeScript.JSDoc | TypeScript.JSDocTag), sourceFile?: TypeScript.SourceFile): (string | undefined);
export declare function getName(tag: TypeScript.JSDocTag, sourceFile?: TypeScript.SourceFile): (string | undefined);
export declare function getTypeExpression(tag: TypeScript.JSDocTag, sourceFile?: TypeScript.SourceFile): (string | undefined);
declare const _default: {
    getComment: typeof getComment;
    getName: typeof getName;
    getTypeExpression: typeof getTypeExpression;
};
export default _default;
