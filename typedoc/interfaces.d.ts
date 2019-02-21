/*
 * Copyright (C) Highsoft AS
 */

/**
 * ./layouts/
 */
export namespace layouts {

    /**
     * Root scope in the HTML body
     */
    interface HTMLBody {

        /**
         * Generated template content
         */
        contents: string;
        /**
         * Full file path of the output file
         */
        filename: string;
        /**
         * File name of the template, e.g. `index.hbs` or `reflection.hbs`
         */
        templateName: string;
        /**
         * Relative url path of the output file based on the output directory
         */
        url: string;

        model: Model;
        navigation: Navigation;
        project: Project;
        settings: Settings;
        template: Function;
        toc: Toc;

    }

    interface Model {

        cssClasses: string;
        hasOwnDocument: boolean;
        id: number;
        kind: number;
        kindString: string;
        name: string;
        readme: string;
        originalName: string;

        categories: Array;
        children: Array;
        flags: any;
        groups: Array;
        parent: (Object|undefined);
        sources: Array;

    }

    interface Navigation {

        cssClasses: string;
        isCurrent: boolean;
        isInPath: boolean;
        isVisible: boolean;
        title: string;
        url: string;

        children: Array<object>;
        parent?: object;
        reflection?: object;

    }

    interface Project {

        id: number;
        kind: number;
        name: string;
        originalName: string;
        readme: string;
        url: string;

        categories: Array;
        children: Array;
        directory: any;
        files: Array;
        flags: any;
        groups: any;
        packageInfo: any;
        parent: (Object|undefined);
        reflections: any;
        symbolMapping: any;

    }

    interface Settings {

        ignoreCompilerErrors: boolean;
        includeDeclarations: boolean;
        name: string;
        readme: string;
        theme: string;

        logger: Function;

    }

    interface Toc {

        cssClasses: string;
        isLabel: boolean;
        title: string;
        url: string;

        children: Array<object>;
        parent?: object;
        reflection?: object;

    }

}

/**
 * ./templates/
 */
export namespace templates {

    /**
     * Root scope in the HTML body
     */
    interface HTMLBody {

        filename: string;
        templateName: string;
        url: string;

        model: Model;
        navigation: Navigation;
        project: Project;
        settings: Settings;
        template: Function;
        toc: Toc;

    }

    interface Model {

        id: number;
        kind: number;
        name: string;
        originalName: string;
        readme: string;
        url: string;

        categories: Array;
        children: Array;
        directory: SourceDirectory;
        files: Array;
        flags: ReflectionFlags;
        groups: Array;
        packageInfo: Object;
        parent: (Object|undefined);
        reflections: Object;
        symbolMapping: Object;

    }

    interface Navigation {

        cssClasses: string;
        isCurrent: boolean;
        isInPath: boolean;
        isVisible: boolean;
        title: string;
        url: string;

        children: Array;
        parent: (Object|undefined);
        reflection: (Object|undefined);

    }

    interface Project {

        id: number;
        kind: number;
        name: string;
        originalName: string;
        readme: string;
        url: string;

        categories: Array;
        children: Array;
        directory: SourceDirectory;
        files: Array;
        flags: ReflectionFlags;
        groups: Array;
        packageInfo: Object;
        parent: (Object|undefined);
        reflections: Object;
        symbolMapping: Object;

    }

    interface Settings {

        ignoreCompilerErrors: boolean;
        includeDeclarations: boolean;
        name: string;
        readme: string;
        /**
         * CWD-relative path to the theme folder
         */
        theme: string,

        logger: Function;

    }

    interface Toc {

        cssClasses: string;
        isLabel: boolean;
        title: string;
        url: string;

        children?: Array<Object>;
        parent?: Object;
        reflection?: Object;

    }

}

declare namespace RenderingPipeline {

    /**
     * Output directory: `./interfaces/`
     */
    namespace Interfaces {

    }

    /**
     * Output directory: `./modules/`
     */
    namespace Modules {

        type Contents = Partials.Index & Partials.Members;

    }



}
