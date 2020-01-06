/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './';
import TS from 'typescript';
export declare class ExportMember extends M.Member<(TS.ExportAssignment | TS.ExportDeclaration)> {
    toJSON(): ExportMemberJSON;
}
export interface ExportMemberJSON extends M.MemberJSON {
    children?: undefined;
    kind: 'export';
}
export default ExportMember;
