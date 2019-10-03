/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as JS from "./JSON/index";
export declare class JSONUtilities {
    static parse(str: string): object;
    static stringify(obj: object): string;
    static toJSONArray<T extends JS.JSONExporter>(obj: Array<T>): Array<ReturnType<T['toJSON']>>;
    private constructor();
    private _memberReferences;
    private dispose;
    private filter;
}
export default JSONUtilities;
