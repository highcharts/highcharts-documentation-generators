/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as TypeScript from 'typescript';
import Member from '../Member';
import ProjectFile from '../ProjectFile';
export declare class ExportMember extends Member {
    static parse(file: ProjectFile, node: TypeScript.Node): (ExportMember | undefined);
    protected constructor(file: ProjectFile, node: ExportMember.NodeType);
    toJSON(): ExportMember.JSON;
}
export declare namespace ExportMember {
    interface JSON extends Member.JSON {
        kind: 'export';
    }
    type NodeType = (TypeScript.ExportAssignment | TypeScript.ExportDeclaration);
}
export default ExportMember;
