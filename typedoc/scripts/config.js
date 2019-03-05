"use strict";
/*
 * Copyright (C) Highsoft AS
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
/* *
 *
 *  Constants
 *
 * */
/**
 * Current working directory
 */
exports.CWD = process.cwd();
/**
 * Debug mode
 */
exports.DEBUG_MODE = true;
/**
 * Default input file path
 */
exports.INPUT_FILE_PATH = path_1.default.join(exports.CWD, 'tree-typedoc.json');
/**
 * Default output path
 */
exports.OUTPUT_PATH = path_1.default.join(exports.CWD, 'build/api');
/**
 * Package working directory
 */
exports.PWD = path_1.default.join(__dirname, '../../..');
