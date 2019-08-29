"use strict";
/*
 * Copyright (C) Highsoft AS
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Library = __importStar(require("./library"));
/* *
 *
 *  Functions
 *
 * */
function cli() {
    Library.debug(__filename, ':cli', arguments);
    process.stderr.write('\nnot implemented\n');
    process.exit(-1);
}
cli();
