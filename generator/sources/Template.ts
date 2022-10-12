/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as FS from 'fs';
import * as Handlebars from 'handlebars';
import * as Path from 'path';

import JSON from './JSON';

/* *
 *
 *  Class
 *
 * */

export class Template {

    /* *
     *
     *  Static Properties
     *
     * */

    public static readonly types: Record<string, Template> = {};

    /* *
     *
     *  Static Functions
     *
     * */

    public static async load(
        path: string
    ): Promise<Template> {
        const file = await FS.promises.readFile(path),
            name = Path.basename(path, Path.extname(path)),
            compile = Handlebars.compile(file),
            template = new Template(name, path, compile);

        Template.types[name] = template;
        Handlebars.registerPartial(name, compile);

        return template;
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor (
        name: string,
        path: string,
        compile: Handlebars.TemplateDelegate
    ) {
        this.name = name;
        this.path = path;
        this.compile = compile;
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly name: string;

    public readonly path: string;

    /* *
     *
     *  Functions
     *
     * */

    public readonly compile: Handlebars.TemplateDelegate<JSON.Object>;

}

export default Template;
