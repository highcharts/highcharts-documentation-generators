/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */
import type ProjectDoc from './ProjectDoc';
/**
 * Generate HTML documentation based on given templates.
 */
export declare class HTML {
    /**
     * Generates HTML files for given project files.
     *
     * @todo implement
     */
    generate(_projectFiles: Array<ProjectDoc.FileJSON>): boolean;
}
export default HTML;
