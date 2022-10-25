/*!*
 *
 *  Copyright (C) Highsoft AS
 *
 * */

/* *
 *
 *  Imports
 *
 * */

import type ImportedJSON from './JSON';

import JSDoc from './JSDoc';
import OptionUtilities from './OptionUtilities';
import ProjectDoc from './ProjectDoc';
import TypeScript from 'typescript';
import Utilities from './Utilities';

/* *
 *
 *  Class
 *
 * */

export class OptionDoc {

    /* *
     *
     *  Static Functions
     *
     * */

    public static load(
        path: string,
        optionTag: string = 'option',
        collectionTag: string = 'option-collection'
    ): OptionDoc {
        return new OptionDoc(
            ProjectDoc.load(path),
            optionTag,
            collectionTag
        );
    }

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        project: ProjectDoc,
        optionTag: string,
        collectionTag: string
    ) {
        this.collectionTag = collectionTag;
        this.optionTag = optionTag;
        this.project = project;
    }

    /* *
     *
     *  Properties
     *
     * */

    public readonly collectionTag: string;

    public readonly project: ProjectDoc;

    public readonly options: OptionDoc.OptionCollectionJSON = {};

    public readonly optionTag: string;

    /* *
     *
     *  Functions
     *
     * */

    private getMeta(
        node: TypeScript.JSDoc,
        sourceFile: TypeScript.SourceFile
    ): OptionDoc.OptionMetaJSON {
        return {
            source: this.project.normalizePath(sourceFile.fileName),
            ...Utilities.extractMeta(node, sourceFile)
        }
    }

    public getOptions(): OptionDoc.OptionCollectionJSON {
        const optionDoc = this,
            options = optionDoc.options;

        if (!Object.keys(options).length) {
            const projectFiles = optionDoc.project.getFiles();

            let projectFile: TypeScript.SourceFile;

            for (let i = 0, iEnd = projectFiles.length; i < iEnd; ++i) {
                projectFile = projectFiles[i];
                optionDoc.parseOptions(
                    projectFile,
                    projectFile
                );
            }
        }

        return options;
    }

    private parseOption(
        node: TypeScript.JSDoc,
        sourceFile: TypeScript.SourceFile
    ): (OptionDoc.OptionJSON|undefined) {
        const optionDoc = this,
            optionTag =  JSDoc.extractTags(
                node,
                sourceFile,
                [optionDoc.optionTag, optionDoc.collectionTag]
            )[0],
            optionName = (typeof optionTag.comment === 'string' && optionTag.comment);

        if (!optionTag || !optionName) {
            return;
        }

        const option: OptionDoc.OptionJSON = {
                name: optionName
            },
            optionTags: OptionDoc.OptionTagsJSON = {},
            tags = JSDoc.extractTags(
                node,
                sourceFile,
                void 0,
                [optionDoc.optionTag, optionDoc.collectionTag]
            );

        if (typeof node.comment === 'string') {
            option.description = node.comment;
        }

        let tag: TypeScript.JSDocTag,
            tagName: string,
            tagValue: string,
            optionValue: (string|Array<string>);

        for (let i = 0, iEnd = tags.length; i < iEnd; ++i) {
            tag = tags[i];
            tagName = tag.tagName.text;
            tagValue = (
                typeof tag.comment === 'string' ?
                    tag.comment :
                    tag.getText(sourceFile).split(/\s+/)[1]
            );
            optionValue = optionTags[tagName];
            if (typeof optionValue === 'string') {
                optionTags[tagName] = [ optionValue, tagValue ];
            } else if (
                optionValue instanceof Array
            ) {
                optionValue.push(tagValue);
            } else {
                optionTags[tagName] = tagValue;
            }
        }

        if (Object.keys(optionTags).length) {
            option.tags = optionTags;
        }

        option.meta = optionDoc.getMeta(node, sourceFile);

        if (optionTag.tagName.getText(sourceFile) === optionDoc.collectionTag) {
            console.log(
                optionName,
                node.parent.getChildren(sourceFile).map(child => TypeScript.SyntaxKind[child.kind])
            );
        }

        return option;
    }

    private parseOptions(
        node: TypeScript.Node,
        sourceFile: TypeScript.SourceFile
    ): OptionDoc.OptionCollectionJSON {
        const optionDoc = this,
            options = optionDoc.options,
            children = node.getChildren(sourceFile);

        if (TypeScript.isJSDoc(node)) {
            const option = optionDoc.parseOption(node, sourceFile);
            
            if (option) {
                OptionUtilities.mergeOption(
                    option,
                    OptionUtilities.getOption(option.name, options)
                );
            }
        }

        let child: TypeScript.Node;

        for (let i = 0, iEnd = children.length; i < iEnd; ++i) {
            child = children[i];
            if (child) {
                optionDoc.parseOptions(child, sourceFile);
            }
        }

        return options;
    }

    public toJSON(): OptionDoc.JSON {
        const optionDoc = this,
            {
                branch,
                commit,
                date,
                description,
                name,
                repository,
                version
            } = optionDoc.project;

        return {
            name,
            version,
            repository,
            branch,
            commit,
            date: date.toISOString(),
            description,
            options: optionDoc.getOptions()
        };
    }
}

/* *
 *
 *  Class Namespace
 *
 * */

export namespace OptionDoc {

    /* *
     *
     *  Declarations
     *
     * */

    export interface JSON extends ImportedJSON.Object {
        branch?: string;
        commit?: string;
        date?: string;
        description?: string;
        name?: string;
        options: OptionCollectionJSON;
        repository?: string;
        version?: string;
    }

    export interface OptionCollectionJSON extends ImportedJSON.Object {
        [key: string]: OptionJSON;
    }

    export interface OptionJSON extends ImportedJSON.Object {
        name: string;
        description?: string;
        tags?: OptionTagsJSON;
        meta?: OptionMetaJSON;
        children?: OptionCollectionJSON;
    }

    export interface OptionMetaJSON extends Utilities.Meta {
        source: string;
    }

    export interface OptionTagsJSON extends ImportedJSON.Object {
        [key: string]: (string|Array<string>);
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default OptionDoc;
