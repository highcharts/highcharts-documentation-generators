/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as Parser from '../../parser/build/';
import Template from './Template';
export declare class Project {
    static load(path: string, template: Template): Promise<Project>;
    private constructor();
    readonly ast: Parser.Project.JSON;
    readonly path: string;
    readonly template: Template;
}
export default Project;
