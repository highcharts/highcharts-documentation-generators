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
        children: Array<Project.Member>;
    }
    interface Interface extends Project.Member {
        kind: 'interface';
        name: string;
        children: Array<Project.Member>;
    }
    interface Module extends Project.Member {
        kind: 'module';
        path?: string;
        name?: string;
        children: Array<Project.Member>;
    }
    interface Property extends Project.Member {
        kind: 'property';
        name: string;
        type: string;
    }
    type Type = (Class | Interface | Module | Property | Unknown);
    interface Unknown extends Project.Member {
        kind: typeof TypeScript.SyntaxKind[0];
        kindID: TypeScript.SyntaxKind;
    }
    function createClass(classNode: TypeScript.ClassDeclaration, sourceFile: TypeScript.SourceFile, project: Project): Member.Class;
    function createInterface(interfaceNode: TypeScript.InterfaceDeclaration, sourceFile: TypeScript.SourceFile, project: Project): Member.Interface;
    function createModule(moduleNode: TypeScript.ModuleDeclaration, sourceFile: TypeScript.SourceFile, project: Project): Member.Module;
    function createProperty(propertyNode: TypeScript.PropertySignature, sourceFile: TypeScript.SourceFile, _project: Project): Member.Property;
    function createUnknown(unknownNode: TypeScript.Node, sourceFile: TypeScript.SourceFile, project: Project): Member.Unknown;
    function parseNode(node: TypeScript.Node, sourceFile: TypeScript.SourceFile, project: Project): Member.Type;
    function parseNodeChildren(node: TypeScript.Node, sourceFile: TypeScript.SourceFile, project: Project): Array<Project.Member>;
}
export default Member;
