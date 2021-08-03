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

import type ProjectDoc from './ProjectDoc';

import JSDoc from './JSDoc';
import Path from 'path';
import MemberUtilities from './MemberUtilities';
import TypeScript, {
    SyntaxKind
} from 'typescript';
import Utilities from './Utilities';

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

    export interface Class extends ProjectDoc.MemberJSON {
        kind: 'class';
        children?: Array<Type>;
    }

    export interface Function extends ProjectDoc.MemberJSON {
        kind: 'function';
        name: string;
        children?: Array<Type>;
    }

    export interface Interface extends ProjectDoc.MemberJSON {
        kind: 'interface';
        name: string;
        children?: Array<Type>;
    }

    export interface Module extends ProjectDoc.MemberJSON {
        kind: 'module';
        path?: string;
        name?: string;
        isDeclaration?: boolean;
        children?: Array<Type>;
    }

    export interface Namespace extends ProjectDoc.MemberJSON {
        kind: 'namespace';
        name: string;
        isDeclaration?: boolean;
        children?: Array<Type>;
    }

    export interface Parameter extends ProjectDoc.MemberJSON {
        kind: 'parameter';
        name: string;
        type?: Array<Type>;
    }

    export interface Property extends ProjectDoc.MemberJSON {
        kind: 'property';
        name: string;
        type?: Array<Type>;
    }

    export type Type = (
        Class|Function|Interface|Module|Namespace|Parameter|Property|Unknown
    );

    export interface Unknown extends ProjectDoc.MemberJSON {
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
        project: ProjectDoc
    ): Class {
        return {
            kind: 'class',
            name: (classNode.name && classNode.name.text || '[anonymous]'),
            comment: JSDoc.extractComment(classNode, sourceFile),
            meta: Utilities.extractMeta(
                classNode,
                sourceFile
            ),
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
        project: ProjectDoc
    ): Function {
        return {
            kind: 'function',
            name: (
                functionNode.name ?
                    functionNode.name.getText(sourceFile) :
                    '[anonymous]'
            ),
            comment: JSDoc.extractComment(
                functionNode,
                sourceFile
            ),
            meta: Utilities.extractMeta(
                functionNode,
                sourceFile
            ),
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
        project: ProjectDoc
    ): Interface {
        return {
            kind: 'interface',
            name: interfaceNode.name.text,
            comment: JSDoc.extractComment(interfaceNode, sourceFile),
            meta: Utilities.extractMeta(interfaceNode, sourceFile),
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
        project: ProjectDoc
    ): (Module|Namespace) {
        const children = moduleNode.getChildren(sourceFile),
            comment = JSDoc.extractComment(
                moduleNode,
                sourceFile
            ),
            isDeclaration = (
                (MemberUtilities.extractSyntax(
                    moduleNode,
                    sourceFile,
                    true
                ) || []).includes('declare') || void 0
            ),
            isNamespace = (
                MemberUtilities.extractKeyword(
                    moduleNode,
                    sourceFile
                ) === 'namespace' || void 0
            ),
            meta = Utilities.extractMeta(
                moduleNode,
                sourceFile
            );

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
                comment,
                isDeclaration,
                meta,
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
                comment,
                isDeclaration,
                meta,
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
        project: ProjectDoc
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
        project: ProjectDoc
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
        project: ProjectDoc
    ): Parameter {
        return {
            kind: 'parameter',
            name: parameterNode.name.getText(sourceFile),
            type: parameterNode.type && parseNodeChildren(
                parameterNode.type,
                sourceFile,
                project
            ),
            meta: Utilities.extractMeta(parameterNode, sourceFile)
        };
    }

    function parseProperty(
        propertyNode: (
            TypeScript.PropertyDeclaration|
            TypeScript.PropertySignature
        ),
        sourceFile: TypeScript.SourceFile,
        project: ProjectDoc
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
            ),
            meta: Utilities.extractMeta(propertyNode, sourceFile)
        };
    }

    function parseUnknown(
        unknownNode: TypeScript.Node,
        sourceFile: TypeScript.SourceFile,
        _project: ProjectDoc
    ): Unknown {
        const unknownMember: Member.Unknown = {
            kind: SyntaxKind[unknownNode.kind],
            kindID: unknownNode.kind,
            syntax: MemberUtilities.extractSyntax(unknownNode, sourceFile),
            meta: Utilities.extractMeta(unknownNode, sourceFile)
        };

        return unknownMember;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Member;
