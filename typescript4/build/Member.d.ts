/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import type ProjectDoc from './ProjectDoc';
import TypeScript from 'typescript';
declare namespace Member {
    interface Class extends ProjectDoc.MemberJSON {
        kind: 'class';
        children?: Array<Type>;
    }
    interface Function extends ProjectDoc.MemberJSON {
        kind: 'function';
        name: string;
        children?: Array<Type>;
    }
    interface Interface extends ProjectDoc.MemberJSON {
        kind: 'interface';
        name: string;
        children?: Array<Type>;
    }
    interface Module extends ProjectDoc.MemberJSON {
        kind: 'module';
        path?: string;
        name?: string;
        isDeclaration?: boolean;
        children?: Array<Type>;
    }
    interface Namespace extends ProjectDoc.MemberJSON {
        kind: 'namespace';
        name: string;
        isDeclaration?: boolean;
        children?: Array<Type>;
    }
    interface Parameter extends ProjectDoc.MemberJSON {
        kind: 'parameter';
        name: string;
        type?: Array<Type>;
    }
    interface Property extends ProjectDoc.MemberJSON {
        kind: 'property';
        name: string;
        type?: Array<Type>;
    }
    type Type = (Class | Function | Interface | Module | Namespace | Parameter | Property | Unknown);
    interface Unknown extends ProjectDoc.MemberJSON {
        kind: typeof TypeScript.SyntaxKind[0];
        kindID: TypeScript.SyntaxKind;
    }
    function parseNode(node: TypeScript.Node, sourceFile: TypeScript.SourceFile, project: ProjectDoc): Type;
    function parseNodeChildren(node: (TypeScript.Node | Readonly<Array<TypeScript.Node>>), sourceFile: TypeScript.SourceFile, project: ProjectDoc): Array<Type>;
}
export default Member;
