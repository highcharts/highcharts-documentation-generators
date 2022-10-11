import Project from './Project';
import TypeScript from 'typescript';
export declare abstract class Member {
    static readonly types: Record<string, typeof Member>;
    static register(MemberClass: typeof Member): void;
    static parse(_node: TypeScript.Node): (Member | undefined);
    protected constructor(project: Project, node: TypeScript.Node);
    readonly project: Project;
    readonly node: TypeScript.Node;
    getTypeReflection(): TypeScript.Type;
}
export default Member;
