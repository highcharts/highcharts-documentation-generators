/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import JSON from './JSON';
export declare class Template {
    static readonly types: Record<string, Template>;
    static load(path: string, relativeTo?: string): Promise<Template>;
    static loadFolder(path: string, recursive?: boolean): Promise<Array<Template>>;
    private constructor();
    readonly name: string;
    readonly path: string;
    private readonly compile;
    write(path: string, data: JSON.Object): Promise<void>;
}
export default Template;
