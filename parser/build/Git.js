"use strict";
/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Git = void 0;
const Utilities_1 = require("./Utilities");
/* *
 *
 *  Namespace
 *
 * */
var Git;
(function (Git) {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Returns the active branch of the given folder.
     */
    function getActiveBranch(cwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Utilities_1.default.exec('git rev-parse --abbrev-ref HEAD', { cwd });
            if (result.error) {
                throw result.error;
            }
            return result.stdout.trim();
        });
    }
    Git.getActiveBranch = getActiveBranch;
    /**
     * Returns the last commit of the given folder.
     */
    function getLastCommit(cwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield Utilities_1.default.exec('git rev-parse --short HEAD', { cwd });
            if (result.error) {
                throw result.error;
            }
            return result.stdout.trim();
        });
    }
    Git.getLastCommit = getLastCommit;
})(Git = exports.Git || (exports.Git = {}));
/* *
 *
 *  Default Export
 *
 * */
exports.default = Git;
//# sourceMappingURL=Git.js.map