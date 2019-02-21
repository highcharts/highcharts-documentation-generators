/*
 * Copyright (C) Highsoft AS
 */

namespace layouts {

    declare interface HTMLBody {

        contents: string;
        filename: string;
        templateName: string;
        url: string;

        model: Model;
        navigation: Navigation;
        project: Project;
        settings: Settings;
        template: any;
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
        parent?: object;
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
        parent?: object;
        reflections: any;
        symbolMapping: any;

    }

    interface Settings {

        ignoreCompilerErrors: boolean;
        includeDeclarations: boolean;
        logger: function;
        name: string;
        readme: string;
        theme: string;

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
