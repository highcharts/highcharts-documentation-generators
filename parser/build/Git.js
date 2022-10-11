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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Git = void 0;
const child_process_1 = __importDefault(require("child_process"));
/* *
 *
 *  Namespace
 *
 * */
var Git;
(function (Git) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    function exec(command, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => child_process_1.default.exec(command, options, (error, stdout, stderr) => resolve({ error, stdout, stderr })));
        });
    }
    /**
     * Returns the active branch of the given folder.
     */
    function getActiveBranch(cwd) {
        return __awaiter(this, void 0, void 0, function* () {
            return exec('git rev-parse --abbrev-ref HEAD', { cwd })
                .then(result => {
                if (result.error) {
                    throw result.error;
                }
                return result.stdout.trim();
            });
        });
    }
    Git.getActiveBranch = getActiveBranch;
    /**
     * Returns the last commit of the given folder.
     */
    function getLastCommit(cwd) {
        return __awaiter(this, void 0, void 0, function* () {
            return exec('git rev-parse --short HEAD', { cwd })
                .then(result => {
                if (result.error) {
                    throw result.error;
                }
                return result.stdout.trim();
            });
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