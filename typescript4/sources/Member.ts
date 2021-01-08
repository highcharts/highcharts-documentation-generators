/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

/* *
 *
 *  Imports
 *
 * */

import type Project from './Project';

import JSDoc from './JSDoc';
import Path from 'path';
import MemberUtilities from './MemberUtilities';
import TypeScript, {
    SyntaxKind
} from 'typescript';

/* *
 *
 *  Namespace
 *
 * */

namespace Member {

    /* *
     *
     *  Declarations
     *
     * */

    export interface Class extends Project.Member {
        kind: 'class';
        children?: Array<Type>;
    }

    export interface Function extends Project.Member {
        kind: 'function';
        name: string;
        children?: Array<Type>;
    }

    export interface Interface extends Project.Member {
        kind: 'interface';
        name: string;
        children?: Array<Type>;
    }

    export interface Module extends Project.Member {
        kind: 'module';
        path?: string;
        name?: string;
        isDeclaration?: boolean;
        children?: Array<Type>;
    }

    export interface Namespace extends Project.Member {
        kind: 'namespace';
        name: string;
        isDeclaration?: boolean;
        children?: Array<Type>;
    }

    export interface Parameter extends Project.Member {
        kind: 'parameter';
        name: string;
        type?: Array<Type>;
    }

    export interface Property extends Project.Member {
        kind: 'property';
        name: string;
        type?: Array<Type>;
    }

    export type Type = (
        Class|Function|Interface|Module|Namespace|Parameter|Property|Unknown
    );

    export interface Unknown extends Project.Member {
        kind: typeof TypeScript.SyntaxKind[0];
        kindID: TypeScript.SyntaxKind;
    }

    /* *
     *
     *  Functions
     *
     * */

    function parseClass(
        classNode: TypeScript.ClassDeclaration,
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Class {
        return {
            kind: 'class',
            name: (classNode.name && classNode.name.text || '[anonymous]'),
            comment: JSDoc.extractComment(classNode, sourceFile),
            children: parseNodeChildren(
                classNode.members,
                sourceFile,
                project
            )
        };
    }

    function parseFunction(
        functionNode: (
            TypeScript.FunctionDeclaration|
            TypeScript.MethodDeclaration
        ),
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Function {
        return {
            kind: 'function',
            name: (
                functionNode.name ?
                    functionNode.name.getText(sourceFile) :
                    '[anonymous]'
            ),
            comment: JSDoc.extractComment(functionNode, sourceFile),
            children: parseNodeChildren(
                functionNode.parameters,
                sourceFile,
                project
            )
        }
    }

    function parseInterface(
        interfaceNode: TypeScript.InterfaceDeclaration,
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Interface {
        return {
            kind: 'interface',
            name: interfaceNode.name.text,
            comment: JSDoc.extractComment(interfaceNode, sourceFile),
            children: parseNodeChildren(
                interfaceNode.members,
                sourceFile,
                project
            )
        };
    }

    function parseModule(
        moduleNode: TypeScript.ModuleDeclaration,
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): (Module|Namespace) {
        const children = moduleNode.getChildren(sourceFile),
            isDeclaration = (
                (MemberUtilities.extractSyntax(moduleNode, sourceFile) || []).includes('declare') ||
                void 0
            ),
            isNamespace = (MemberUtilities.extractKeyword(moduleNode, sourceFile) === 'namespace');

        let node: TypeScript.Node,
            block: (TypeScript.ModuleBlock|undefined),
            name: (string|undefined),
            path: (string|undefined);

        for (let i = 0, iEnd = children.length; i < iEnd; ++i) {
            node = children[i];

            if (TypeScript.isIdentifier(node)) {
                name = node.text;
            } else if (
                TypeScript.isModuleBlock(node)
            ) {
                block = node;
            } else if (
                TypeScript.isStringLiteral(node)
            ) {
                path = project.normalizePath(
                    Path.dirname(sourceFile.fileName),
                    node.text
                );
            }
        }

        if (isNamespace) {
            return {
                kind: 'namespace',
                name: name || '[anonymous]',
                comment: JSDoc.extractComment(moduleNode, sourceFile),
                isDeclaration,
                children: (
                    block ?
                        parseNodeChildren(
                            block.statements,
                            sourceFile,
                            project
                        ) :
                        []
                )
            }
        } else {
            return {
                kind: 'module',
                path,
                name,
                comment: JSDoc.extractComment(moduleNode, sourceFile),
                isDeclaration,
                children: (
                    block ?
                        parseNodeChildren(
                            block.statements,
                            sourceFile,
                            project
                        ) :
                        []
                )
            };
        }
    }

    export function parseNode(
        node: TypeScript.Node,
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Type {
        if (TypeScript.isClassDeclaration(node)) {
            return parseClass(node, sourceFile, project);
        } else if (
            TypeScript.isFunctionDeclaration(node) ||
            TypeScript.isMethodDeclaration(node)
        ) {
            return parseFunction(node, sourceFile, project);
        } else if (
            TypeScript.isInterfaceDeclaration(node)
        ) {
            return parseInterface(node, sourceFile, project);
        } else if (
            TypeScript.isModuleDeclaration(node)
        ) {
            return parseModule(node, sourceFile, project);
        } else if (
            TypeScript.isParameter(node)
        ) {
            return parseParameter(node, sourceFile, project);
        } else if (
            TypeScript.isPropertyDeclaration(node) ||
            TypeScript.isPropertySignature(node)
        ) {
            return parseProperty(node, sourceFile, project);
        }

        return parseUnknown(node, sourceFile, project);
    }

    export function parseNodeChildren(
        node: (TypeScript.Node|Readonly<Array<TypeScript.Node>>),
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Array<Type> {
        let children: Readonly<Array<TypeScript.Node>>;

        if (node instanceof Array) {
            children = node;
        } else {
            children = node.getChildren(sourceFile);
        }

        return children.map(child => parseNode(child, sourceFile, project));
    }

    function parseParameter(
        parameterNode: TypeScript.ParameterDeclaration,
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Parameter {
        return {
            kind: 'parameter',
            name: parameterNode.name.getText(sourceFile),
            type: parameterNode.type && parseNodeChildren(
                parameterNode.type,
                sourceFile,
                project
            )
        };
    }

    function parseProperty(
        propertyNode: (
            TypeScript.PropertyDeclaration|
            TypeScript.PropertySignature
        ),
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Property {
        return {
            kind: 'property',
            name: propertyNode.name.getText(sourceFile),
            comment: JSDoc.extractComment(propertyNode, sourceFile),
            modifiers: MemberUtilities.extractModifiers(propertyNode, sourceFile),
            optional: propertyNode.questionToken && true,
            type: propertyNode.type && parseNodeChildren(
                propertyNode.type,
                sourceFile,
                project
            )
        };
    }

    function parseUnknown(
        unknownNode: TypeScript.Node,
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Unknown {
        const unknownMember: Member.Unknown = {
            kind: SyntaxKind[unknownNode.kind],
            kindID: unknownNode.kind,
            syntax: MemberUtilities.extractSyntax(unknownNode, sourceFile)
        };

        if (
            TypeScript.isInterfaceDeclaration(unknownNode)
        ) {
            const children = parseNodeChildren(
                unknownNode,
                sourceFile,
                project
            );

            if (children.length) {
                unknownMember.children = children;
            }
        }

        return unknownMember;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Member;
