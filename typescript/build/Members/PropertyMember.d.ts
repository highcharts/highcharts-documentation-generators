/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as M from './index';
import * as T from '../Types/index';
import TS from 'typescript';
export declare class PropertyMember extends M.Member<TS.PropertyDeclaration> {
    toJSON(): PropertyMemberJSON;
}
export interface PropertyMemberJSON extends M.MemberJSON {
    children?: undefined;
    kind: 'property';
    isNonOptional?: boolean;
    isOptional?: boolean;
    modifiers: Array<string>;
    name: string;
    type: T.TypeJSON;
}
export default PropertyMember;
