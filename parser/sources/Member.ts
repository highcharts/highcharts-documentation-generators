
import Project from './Project';
import TypeScript from 'typescript';

/* *
 *
 *  Class
 *
 * */

export abstract class Member {

    /* *
     *
     *  Static Properties
     *
     * */

    public static readonly types: Record<string, typeof Member> = {};

    /* *
     *
     *  Static Functions
     *
     * */

    public static register(
        MemberClass: typeof Member
    ): void {
        Member.types[MemberClass.name] = MemberClass;
    }

    public static parse(
        _node: TypeScript.Node
    ): (Member|undefined) {
        return;
    }

    /* *
     *
     *  Constructor
     *
     * */

    protected constructor (
        project: Project,
        node: TypeScript.Node
    ) {
        this.project = project;
        this.node = node;
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly project: Project;

    public readonly node: TypeScript.Node;

    /* *
     *
     *  Functions
     *
     * */

    public getTypeReflection(): TypeScript.Type {
        return this.project.typeChecker.getTypeAtLocation(this.node);
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default Member;
