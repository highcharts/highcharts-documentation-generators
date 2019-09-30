/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import TS from 'typescript';
export declare abstract class Member {
    abstract loadNode(node: TS.Node, isTest?: boolean): boolean;
    supportsNode(node: TS.Node): boolean;
}
export default Member;
