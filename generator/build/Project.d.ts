/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as Parser from '../../parser/build/';
export declare class Project {
    static load(path: string): Promise<Project>;
    private constructor();
    readonly ast: Parser.Project.JSON;
    readonly path: string;
}
export default Project;
