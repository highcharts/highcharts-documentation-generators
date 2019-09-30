/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import NamespaceMember from './members/NamespaceMember';
export declare class Project {
    static loadArguments(args: Array<string>): Project;
    static loadDirectory(directoryPath: string): Project;
    static loadTSConfig(filePath: string): Project;
    private constructor();
    private _directoryPath;
    private _program;
    getChildren(): Array<NamespaceMember>;
}
export default Project;
