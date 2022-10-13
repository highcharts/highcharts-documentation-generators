/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import JSON from './JSON';
export declare class Template {
    static readonly types: Record<string, Template>;
    static load(path: string): Promise<Template>;
    private constructor();
    readonly name: string;
    readonly path: string;
    private readonly compile;
    write(path: string, data: JSON.Object): Promise<void>;
}
export default Template;
