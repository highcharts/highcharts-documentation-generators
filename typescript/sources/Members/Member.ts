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
        this._isNotSupported = isNotSupported;
        this._node = node;
        this._sourceFile = sourceFile;
    }

    /* *
     *
     *  Properties
     *
     * */

    private _isNotSupported: boolean;
    private _node: TNode;
    private _sourceFile: TS.SourceFile;

    protected get isNotSupported(): boolean {
        return this._isNotSupported;
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

        let memberChild: (Member|undefined);

        for (let nodeChild of nodeChildren) {

            memberChild = MembersUtilities.loadFromNode(sourceFile, nodeChild);

            if (memberChild.isNotSupported) {
                memberChildren.push(...memberChild.getChildren());
            } else {
                memberChildren.push(memberChild);
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
            kind: '',
            kindID: this.node.kind
        };
    }
}

export interface MemberJSON extends JSONNode {
    children: Array<MemberJSON>;
    kind: string;
    kindID: TS.SyntaxKind;
}

export default Member;
