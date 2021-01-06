/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import JSON from './JSON';
import TypeScript from 'typescript';
/**
 * Project to document.
 */
export declare class Project {
    static load(path: string): Project;
    private constructor();
    private readonly files;
    readonly path: string;
    private readonly program;
    readonly resolvedPath: string;
    private createInterfaceMember;
    private createModuleMember;
    private createPropertyMember;
    private createUnknownMember;
    normalizePath(...paths: Array<string>): string;
    private parseFiles;
    private parseNode;
    private parseNodeChildren;
    toJSON(): JSON.Collection;
    toString(): string;
}
export declare namespace Project {
    interface File extends JSON.Object {
        path: string;
        children: Array<Member>;
    }
    interface InterfaceMember extends Member {
        kind: 'interface';
        name: string;
        children: Array<Member>;
    }
    interface Member extends JSON.Object {
        kind: string;
        children?: Array<Member>;
    }
    type MemberType = (InterfaceMember | ModuleMember | PropertyMember | UnknownMember);
    interface ModuleMember extends Member {
        kind: 'module';
        path?: string;
        name?: string;
        children: Array<Member>;
    }
    interface PropertyMember extends Member {
        kind: 'property';
        name: string;
        type: string;
    }
    interface UnknownMember extends Member {
        kind: typeof TypeScript.SyntaxKind[0];
        kindID: TypeScript.SyntaxKind;
    }
}
export default Project;
