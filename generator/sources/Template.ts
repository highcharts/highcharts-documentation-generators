/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as FS from 'fs';
import * as Handlebars from 'handlebars';
import * as Path from 'path';

import JSON from './JSON';
import U from './Utilities';

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
        path: string,
        relativeTo?: string
    ): Promise<Template> {
        const buffer = await FS.promises.readFile(path);
        const name = Path.relative(
            relativeTo || Path.dirname(path),
            path.substring(0, path.length - Path.extname(path).length)
        );
        const compile = Handlebars.compile(buffer.toString());
        const template = new Template(name, path, compile);

        Template.types[name] = template;
        Handlebars.registerPartial(name, compile);

        return template;
    }

    public static async loadFolder(
        path: string,
        recursive?: boolean
    ): Promise<Array<Template>> {
        const files = U.getFilePaths(path, recursive);
        const promises: Array<Promise<Template>> = [];

        for (const file of files) {
            promises.push(Template.load(file, path));
        }

        return Promise.all(promises);
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

    private readonly compile: Handlebars.TemplateDelegate<JSON.Object>;

    public async write(
        path: string,
        data: JSON.Object
    ): Promise<void> {
        const template = this,
            file = template.compile(data, {});

        await FS.promises.writeFile(path, file);
    }

}

export default Template;
