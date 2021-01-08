/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import type Project from './Project';
import TypeScript from 'typescript';
declare namespace Member {
    interface Class extends Project.Member {
        kind: 'class';
        children?: Array<Type>;
    }
    interface Function extends Project.Member {
        kind: 'function';
        name: string;
        children?: Array<Type>;
    }
    interface Interface extends Project.Member {
        kind: 'interface';
        name: string;
        children?: Array<Type>;
    }
    interface Module extends Project.Member {
        kind: 'module';
        path?: string;
        name?: string;
        isDeclaration?: boolean;
        children?: Array<Type>;
    }
    interface Namespace extends Project.Member {
        kind: 'namespace';
        name: string;
        isDeclaration?: boolean;
        children?: Array<Type>;
    }
    interface Parameter extends Project.Member {
        kind: 'parameter';
        name: string;
        type?: Array<Type>;
    }
    interface Property extends Project.Member {
        kind: 'property';
        name: string;
        type?: Array<Type>;
    }
    type Type = (Class | Function | Interface | Module | Namespace | Parameter | Property | Unknown);
    interface Unknown extends Project.Member {
        kind: typeof TypeScript.SyntaxKind[0];
        kindID: TypeScript.SyntaxKind;
    }
    function parseNode(node: TypeScript.Node, sourceFile: TypeScript.SourceFile, project: Project): Type;
    function parseNodeChildren(node: (TypeScript.Node | Readonly<Array<TypeScript.Node>>), sourceFile: TypeScript.SourceFile, project: Project): Array<Type>;
}
export default Member;
