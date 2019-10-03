/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as JS from '../JSON/index';
import MembersUtilities from '../MembersUtilities';
import TS from 'typescript';

export class Member<TNode extends TS.Node = TS.Node>
    implements JS.JSONExporter
{

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

        const childrenJSON = this.getChildrenJSON();
        const node = this.node;

        return {
            children: childrenJSON.length === 0 ?
                undefined :
                childrenJSON,
            kind: '',
            kindID: node.kind,
            name: this.toString(),
            unsupportedNode: this.isSupported ?
                undefined :
                node
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
