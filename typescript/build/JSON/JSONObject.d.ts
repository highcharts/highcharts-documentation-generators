/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as JS from './index';
export interface JSONObject {
    [key: string]: (JS.JSONArray | JSONObject | JS.JSONValue | undefined);
}
export default JSONObject;
