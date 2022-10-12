/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as FS from 'fs';
import * as Parser from '../../parser/build/';

import Template from './Template';

/* *
 *
 *  Class
 *
 * */

export class Project {

    /* *
     *
     *  Static Functions
     *
     * */

    public static async load(
        path: string,
        template: Template
    ): Promise<Project> {
        const file = await FS.promises.readFile(path),
            ast = JSON.parse(file.toString());

        if (
            ast.files instanceof Array &&
            typeof ast.name === 'string'
        ) {
            return new Project(ast, path, template);
        }

        throw new Error('Project tree invalid.');
    }

    /* *
     *
     *  Constructor
     *
     * */

    private constructor (
        ast: Parser.Project.JSON,
        path: string,
        template: Template
    ) {
        this.ast = ast;
        this.path = path;
        this.template = template;
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly ast: Parser.Project.JSON;

    public readonly path: string;

    public readonly template: Template;

}

/* *
 *
 *  Default Export
 *
 * */

export default Project;
