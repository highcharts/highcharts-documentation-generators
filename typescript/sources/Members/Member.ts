/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as JS from '../JSON/';
import MembersUtilities from '../MembersUtilities';
import TS from 'typescript';

function childrenJSONMapper(child: Member): MemberJSON {
    return child.toJSON();
}

export class Member<TNode extends TS.Node = TS.Node> implements JS.JSONExporter
{

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

    public get isNotSupported(): boolean {
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

    public getChildNodes(): Array<TS.Node> {
        return this.node.getChildren(this.sourceFile);
    }

    public getChildren(): Array<Member> {

        const sourceFile = this.sourceFile;
        const nodeChildren = this.getChildNodes();
        const memberChildren: Array<Member> = [];

        let memberChild: Member;

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
            .map(childrenJSONMapper);
    }

    public toJSON(): MemberJSON {

        const childrenJSON = this.getChildrenJSON();
        const node = this.node;

        return {
            children: childrenJSON.length === 0 ?
                undefined :
                childrenJSON,
            kind: TS.SyntaxKind[node.kind],
            kindID: node.kind,
            name: this.toString(),
            unsupportedNode: this.isNotSupported ?
                node :
                undefined
        };
    }

    public toString(): string {
        return TS.getGeneratedNameForNode(this.node).escapedText.toString();
    }
}

export interface MemberJSON extends JS.JSONObject {
    children?: Array<MemberJSON>;
    kind: string;
    kindID: TS.SyntaxKind;
    unsupportedNode?: TS.Node;
}

export default Member;
