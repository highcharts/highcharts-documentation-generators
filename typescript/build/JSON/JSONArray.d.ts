/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as JS from './index';
export interface JSONArray extends Array<(JSONArray | JS.JSONObject | JS.JSONValue)> {
}
export default JSONArray;
