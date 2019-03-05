/*
 * Copyright (C) Highsoft AS
 */

import Path from 'path';

/* *
 *
 *  Constants
 *
 * */

/**
 * Current working directory
 */
export const CWD = process.cwd();

/**
 * Debug mode
 */
export const DEBUG_MODE = true;

/**
 * Default input file path
 */
export const INPUT_FILE_PATH = Path.join(CWD, 'tree-typedoc.json');

/**
 * Default output path
 */
export const OUTPUT_PATH = Path.join(CWD, 'build/api');

/**
 * Package working directory
 */
export const PWD = Path.join(__dirname, '../../..');
