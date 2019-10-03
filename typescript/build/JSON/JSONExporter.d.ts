/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import * as JS from './index';
export interface JSONExporter {
    toJSON(): (JS.JSONArray | JS.JSONObject | JS.JSONValue | undefined);
}
export default JSONExporter;
