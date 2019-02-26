/**
 * Tree node of TypeDoc
 */
export interface TreeNode {
    children?: Array<TreeNode>;
    comment?: {
        shortText: string;
        tags: Array<{
            tag: string;
            text: string;
        }>;
    };
    defaultValue?: string;
    flags: {
        isConst?: boolean;
        isExported?: boolean;
        isExternal?: boolean;
        isLet?: boolean;
    };
    groups?: Array<{
        title: string;
        kind: number;
        children: Array<number>;
    }>;
    id: number;
    kind: number;
    kindString?: string;
    name: string;
    originalName?: string;
    sources?: Array<{
        filename: string;
        line: number;
        caharacter: number;
    }>;
    type?: {
        type: string;
        name: string;
    };
}
/**
 * Gets the tree file by TypeDoc from cache or current working directory.
 *
 * @param typeDocJsonPath
 *        Path to tree file by TypeDoc
 */
export declare function getTree(typeDocJsonPath: string): Promise<TreeNode>;
