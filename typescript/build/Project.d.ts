/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import JSONNode from './JSONNode';
import ModuleMember from './Members/ModuleMember';
export declare class Project implements JSONNode {
    static loadFromArguments(args: Array<string>): Project;
    static loadFromDirectory(directoryPath: string): Project;
    private constructor();
    private _directoryPath;
    private _program;
    getChildren(): Array<ModuleMember>;
    toJSON(): object;
}
export default Project;
