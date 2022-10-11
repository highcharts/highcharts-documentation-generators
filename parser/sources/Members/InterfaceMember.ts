/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import Member from '../Member';
import ProjectFile from '../ProjectFile';
import TypeScript from 'typescript';

/* *
 *
 *  Class
 *
 * */

export class InterfaceMember extends Member {

    /* *
     *
     *  Static Functions
     *
     * */

    public static parse(
        file: ProjectFile,
        node: TypeScript.Node
    ): (InterfaceMember|undefined) {

        if (!TypeScript.isInterfaceDeclaration(node)) {
            return;
        }

        return new InterfaceMember(file, node);
    }


    /* *
     *
     *  Constructor
     *
     * */

    protected constructor(
        file: ProjectFile,
        node: InterfaceMember.NodeType
    ) {
        super(file, node);
        this.name = node.name.getText(file.node);
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly name: string;

    /* *
     *
     *  Functions
     *
     * */

    public toJSON(
        _skipChildren?: boolean
    ): InterfaceMember.JSON {
        const functionMember = this,
            name = functionMember.name;

        return {
            ...super.toJSON(true),
            kind: 'interface',
            name
        };
    }

}

/* *
 *
 *  Class Prototype
 *
 * */

export interface InterfaceMember {
    readonly node: InterfaceMember.NodeType;
}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace InterfaceMember {

    /* *
     *
     *  Declarations
     *
     * */

    export interface JSON extends Member.JSON {
        kind: 'interface';
        name: string;
    }

    export type NodeType = (
        TypeScript.InterfaceDeclaration
    );

}

/* *
 *
 *  Registry
 *
 * */

Member.register(InterfaceMember);

/* *
 *
 *  Default Export
 *
 * */

export default InterfaceMember;
