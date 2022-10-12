/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as Handlebars from 'handlebars';
import JSON from './JSON';
export declare class Template {
    static readonly types: Record<string, Template>;
    static load(path: string): Promise<Template>;
    private constructor();
    readonly name: string;
    readonly path: string;
    readonly compile: Handlebars.TemplateDelegate<JSON.Object>;
}
export default Template;
