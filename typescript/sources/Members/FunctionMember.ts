/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

import * as M from './';
import TS from 'typescript';
import TypesUtilities from '../TypesUtilities';

function parameterJSONMapper (child: M.ParameterMember): M.ParameterMemberJSON {
    return child.toJSON();
}

export class FunctionMember extends M.Member<(TS.FunctionDeclaration|TS.MethodDeclaration)> {

    /* *
     *
     *  Functions
     *
     * */

    public getParameterNodes(): Array<TS.ParameterDeclaration> {
        return (this.node.parameters || []).slice();
    }

    public getParameters(): Array<M.ParameterMember> {

        const parameterNodes = this.getParameterNodes();
        const parameters: Array<M.ParameterMember> = [];
        const sourceFile = this.sourceFile;

        for (let parameterNode of parameterNodes) {
            parameters.push(new M.ParameterMember(sourceFile, parameterNode));
        }

        return parameters;
    }

    public getParametersJSON(): Array<M.ParameterMemberJSON> {
        return this
            .getParameters()
            .map(parameterJSONMapper);
    }

    public toJSON(): FunctionMemberJSON {

        const node = this.node;
        const sourceFile = this.sourceFile
        const superJSON = super.toJSON();

        return {
            children: superJSON.children,
            kind: 'function',
            kindID: superJSON.kindID,
            modifiers: node.modifiers,
            name: (node.name && node.name.toString() || ''),
            parameters: this.getParametersJSON(),
            returnType: TypesUtilities
                .loadFromTypeNode(sourceFile, node.type)
                .toJSON()
        };
    }
}

export interface FunctionMemberJSON extends M.MemberJSON {
    kind: 'function';
    name: string;
}

export default FunctionMember;
