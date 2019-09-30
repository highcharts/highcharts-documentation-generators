/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
export interface JSONNode {
    getChildren(): Array<JSONNode>;
    toJSON(): (boolean | number | object | string | null | undefined);
}
export default JSONNode;
