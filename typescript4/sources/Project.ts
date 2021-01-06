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

import JSON from './JSON';
import Path from 'path';
import TypeScript, {
    InterfaceDeclaration,
    ModuleBlock,
    ModuleDeclaration,
    Node,
    Program,
    PropertySignature,
    SourceFile,
    SyntaxKind,
    sys as System
} from 'typescript';

/* *
 *
 *  Class
 *
 * */

/**
 * Project to document.
 */
export class Project {

    /* *
     *
     *  Static Functions
     *
     * */

    public static load(path: string): Project {
        return new Project(path);
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor (
        path: string
    ) {
        const resolvedPath = System.resolvePath(path),
            parsedCommandLine = TypeScript.parseJsonConfigFileContent(
                TypeScript.readJsonConfigFile(
                    resolvedPath,
                    System.readFile
                ),
                System,
                resolvedPath
            );

        this.path = path;
        this.program = TypeScript.createProgram(
            parsedCommandLine.fileNames,
            parsedCommandLine.options
        );
        this.resolvedPath = resolvedPath;
    }

    /* *
     *
     *  Properties
     *
     * */

    private readonly files: Record<string, Project.File> = {};

    public readonly path: string;

    private readonly program: Program;

    public readonly resolvedPath: string;

    /* *
     *
     *  Functions
     *
     * */

    private createInterfaceMember(
        interfaceNode: InterfaceDeclaration,
        sourceFile: SourceFile
    ): Project.InterfaceMember {
        const project = this;
        return {
            kind: 'interface',
            name: interfaceNode.name.text,
            children: interfaceNode.members.map(node => project.parseNode(node, sourceFile))
        };
    }

    private createModuleMember(
        moduleNode: ModuleDeclaration,
        sourceFile: SourceFile
    ): Project.ModuleMember {
        const project = this,
            children = moduleNode.getChildren(sourceFile);

        let node: Node,
            name: (string|undefined),
            path: (string|undefined),
            declarations: (ModuleBlock|undefined);

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
            children: (
                declarations ?
                    project.parseNodeChildren(
                        declarations.getChildAt(1, sourceFile),
                        sourceFile
                    ) :
                    []
            )
        };
    }

    private createPropertyMember(
        propertyNode: PropertySignature,
        sourceFile: SourceFile
    ): Project.PropertyMember {
        let type = propertyNode.type?.getText(sourceFile) || 'any';

        return {
            kind: 'property',
            name: propertyNode.name.getText(sourceFile),
            type
        };
    }

    private createUnknownMember(
        unknownNode: Node,
        sourceFile: SourceFile
    ): Project.UnknownMember {
        const project = this,
            unknownMember: Project.UnknownMember = {
                kind: SyntaxKind[unknownNode.kind],
                kindID: unknownNode.kind,
            };

        if (
            TypeScript.isInterfaceDeclaration(unknownNode)
        ) {
            const children = project.parseNodeChildren(unknownNode, sourceFile);

            if (children.length) {
                unknownMember.children = children;
            }
        }

        return unknownMember;
    }

    public normalizePath(...paths: Array<string>): string {
        const project = this,
            resolvedPath = project.resolvedPath;

        let path = System
            .resolvePath(Path.join(...paths))
            .replace(/(?:\.d)?\.[jt]sx?$/, '');

        if (Path.isAbsolute(path)) {
            path = Path.relative(resolvedPath, path);
        }

        return path;
    }

    private parseFiles(): Array<Project.File> {
        const project = this,
            projectFiles = project.files,
            resolvedPath = project.resolvedPath,
            sourceFiles = project.program.getSourceFiles();

        if (!Object.keys(projectFiles).length) {
            let sourceFile: SourceFile,
                sourcePath: string;

            for (let i = 0, iEnd = sourceFiles.length; i < iEnd; ++i) {
                sourceFile = sourceFiles[i];

                if (sourceFile.fileName.startsWith(resolvedPath)) {
                    sourcePath = project.normalizePath(sourceFile.fileName);
                    projectFiles[sourcePath] = {
                        path: sourcePath,
                        children: project.parseNodeChildren(
                            sourceFile.getChildAt(0, sourceFile),
                            sourceFile
                        )
                    };
                }
            }
        }

        return Object.values(projectFiles);

    }

    private parseNode(
        node: Node,
        sourceFile: SourceFile
    ): Project.MemberType {
        const project = this;

        if (TypeScript.isInterfaceDeclaration(node)) {
            return project.createInterfaceMember(node, sourceFile);
        }
        if (TypeScript.isModuleDeclaration(node)) {
            return project.createModuleMember(node, sourceFile);
        }
        if (TypeScript.isPropertySignature(node)) {
            return project.createPropertyMember(node, sourceFile);
        }

        return project.createUnknownMember(node, sourceFile);
    }

    private parseNodeChildren(
        node: Node,
        sourceFile: SourceFile
    ): Array<Project.Member> {
        const project = this;

        return node
            .getChildren(sourceFile)
            .map(child => project.parseNode(child, sourceFile));
    }

    public toJSON(): JSON.Collection {
        const project = this;

        return project.parseFiles();
    }

    public toString(): string {
        return '[object Project]';
    }

}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace Project {

    /* *
     *
     *  Declarations
     *
     * */

    export interface File extends JSON.Object {
        path: string;
        children: Array<Member>;
    }

    export interface InterfaceMember extends Member {
        kind: 'interface';
        name: string;
        children: Array<Member>;
    }

    export interface Member extends JSON.Object {
        kind: string;
        children?: Array<Member>;
    }

    export type MemberType = (
        InterfaceMember|ModuleMember|PropertyMember|UnknownMember
    );

    export interface ModuleMember extends Member {
        kind: 'module';
        path?: string;
        name?: string;
        children: Array<Member>;
    }

    export interface PropertyMember extends Member {
        kind: 'property';
        name: string;
        type: string;
    }

    export interface UnknownMember extends Member {
        kind: typeof TypeScript.SyntaxKind[0];
        kindID: TypeScript.SyntaxKind;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Project;
