/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
export declare class JSONUtilities {
    static parse(str: string): object;
    static stringify(obj: object): string;
    private constructor();
    private _memberReferences;
    private dispose;
    private filter;
}
