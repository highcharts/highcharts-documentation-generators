/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as FS from 'fs';
import * as Parser from '../../parser/build/';

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
        path: string
    ): Promise<Project> {
        const buffer = await FS.promises.readFile(path);
        const ast = JSON.parse(buffer.toString());

        if (
            ast.files instanceof Array &&
            typeof ast.name === 'string'
        ) {
            return new Project(ast, path);
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
        path: string
    ) {
        this.ast = ast;
        this.path = path;
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly ast: Parser.Project.JSON;

    public readonly path: string;

}

/* *
 *
 *  Default Export
 *
 * */

export default Project;
