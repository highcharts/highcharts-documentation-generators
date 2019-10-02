/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import JSONNode from '../JSONNode';
import MembersUtilities from '../MembersUtilities';
import TS from 'typescript';

export class Member<TNode extends TS.Node = TS.Node> {

    /* *
     *
     *  Static Functions
     *
     * */

    private static childrenJSONMapper(child: Member): MemberJSON {
        return child.toJSON();
    }

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        sourceFile: TS.SourceFile,
        node: TNode,
        isNotSupported: boolean = false
    ) {
        this._isSupported = (isNotSupported === false);
        this._node = node;
        this._sourceFile = sourceFile;
    }

    /* *
     *
     *  Properties
     *
     * */

    private _isSupported: boolean;
    private _node: TNode;
    private _sourceFile: TS.SourceFile;

    public get isSupported(): boolean {
        return this._isSupported;
    }

    protected get node(): TNode {
        return this._node;
    }

    protected get sourceFile(): TS.SourceFile {
        return this._sourceFile;
    }

    /* *
     *
     *  Functions
     *
     * */

    public getChildren(): Array<Member> {

        const sourceFile = this.sourceFile;
        const nodeChildren = this.node.getChildren(sourceFile);
        const memberChildren: Array<Member> = [];

        let memberChild: Member;

        for (let nodeChild of nodeChildren) {

            memberChild = MembersUtilities.loadFromNode(sourceFile, nodeChild);

            if (memberChild.isSupported) {
                memberChildren.push(memberChild);
            } else {
                memberChildren.push(...memberChild.getChildren());
            }
        }

        return memberChildren;
    }

    public getChildrenJSON(): Array<MemberJSON> {
        return this
            .getChildren()
            .map(Member.childrenJSONMapper);
    }

    public toJSON(): MemberJSON {
        return {
            children: this.getChildrenJSON(),
            kind: this.toString(),
            kindID: this.node.kind
        };
    }

    public toString(): string {
        return '';
    }
}

export interface MemberJSON extends JSONNode {
    children: Array<MemberJSON>;
    kind: string;
    kindID: TS.SyntaxKind;
}

export default Member;
