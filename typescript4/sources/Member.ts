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
        children: Array<Project.Member>;
    }

    export interface Interface extends Project.Member {
        kind: 'interface';
        name: string;
        children: Array<Project.Member>;
    }

    export interface Module extends Project.Member {
        kind: 'module';
        path?: string;
        name?: string;
        children: Array<Project.Member>;
    }

    export interface Property extends Project.Member {
        kind: 'property';
        name: string;
        type: string;
    }

    export type Type = (Class|Interface|Module|Property|Unknown);

    export interface Unknown extends Project.Member {
        kind: typeof TypeScript.SyntaxKind[0];
        kindID: TypeScript.SyntaxKind;
    }

    /* *
     *
     *  Functions
     *
     * */

    export function createClass(
        classNode: TypeScript.ClassDeclaration,
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Member.Class {
        return {
            kind: 'class',
            name: (classNode.name && classNode.name.text || '[anonymous]'),
            comment: JSDoc.extractComment(classNode, sourceFile),
            children: classNode.members.map(
                node => parseNode(
                    node,
                    sourceFile,
                    project
                )
            )
        };
    }

    export function createInterface(
        interfaceNode: TypeScript.InterfaceDeclaration,
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Member.Interface {
        return {
            kind: 'interface',
            name: interfaceNode.name.text,
            comment: JSDoc.extractComment(interfaceNode, sourceFile),
            children: interfaceNode.members.map(
                node => parseNode(
                    node,
                    sourceFile,
                    project
                )
            )
        };
    }

    export function createModule(
        moduleNode: TypeScript.ModuleDeclaration,
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Member.Module {
        const children = moduleNode.getChildren(sourceFile);

        let node: TypeScript.Node,
            name: (string|undefined),
            path: (string|undefined),
            declarations: (TypeScript.ModuleBlock|undefined);

        for (let i = 0, iEnd = children.length; i < iEnd; ++i) {
            node = children[i];
            if (TypeScript.isIdentifier(node)) {
                name = node.text;
            }
            else if (TypeScript.isModuleBlock(node)) {
                declarations = node;
            }
            else if (TypeScript.isStringLiteral(node)) {
                path = project.normalizePath(
                    Path.dirname(sourceFile.fileName),
                    node.text
                );
            }
        }

        return {
            kind: 'module',
            path,
            name,
            comment: JSDoc.extractComment(moduleNode, sourceFile),
            children: (
                declarations ?
                    parseNodeChildren(
                        declarations.getChildAt(1, sourceFile),
                        sourceFile,
                        project
                    ) :
                    []
            )
        };
    }

    export function createProperty(
        propertyNode: TypeScript.PropertySignature,
        sourceFile: TypeScript.SourceFile,
        _project: Project
    ): Member.Property {
        let type = propertyNode.type?.getText(sourceFile) || 'any';

        return {
            kind: 'property',
            name: propertyNode.name.getText(sourceFile),
            comment: JSDoc.extractComment(propertyNode, sourceFile),
            type
        };
    }

    export function createUnknown(
        unknownNode: TypeScript.Node,
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Member.Unknown {
        const unknownMember: Member.Unknown = {
            kind: SyntaxKind[unknownNode.kind],
            kindID: unknownNode.kind,
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

    export function parseNode(
        node: TypeScript.Node,
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Member.Type {
        if (TypeScript.isClassDeclaration(node)) {
            return createClass(node, sourceFile, project);
        }
        if (TypeScript.isInterfaceDeclaration(node)) {
            return createInterface(node, sourceFile, project);
        }
        if (TypeScript.isModuleDeclaration(node)) {
            return createModule(node, sourceFile, project);
        }
        if (TypeScript.isPropertySignature(node)) {
            return createProperty(node, sourceFile, project);
        }

        return createUnknown(node, sourceFile, project);
    }

    export function parseNodeChildren(
        node: TypeScript.Node,
        sourceFile: TypeScript.SourceFile,
        project: Project
    ): Array<Project.Member> {
        return node
            .getChildren(sourceFile)
            .map(child => parseNode(child, sourceFile, project));
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Member;
