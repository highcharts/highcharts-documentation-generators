/* eslint-disable */
/* eslint-env node,es6 */
/**
 * @module plugins/highcharts.jsdoc
 * @author Chris Vasseng
 */

"use strict";

// const Doclet = require('jsdoc/doclet.js').Doclet;
// const colors = require('colors');
const exec = require('child_process').execSync;
const fs = require('fs');
const fsPath = require('path');
const logger = require('jsdoc/util/logger');
// const parseTag = require('jsdoc/tag/type').parse;
// const path = require('path');
const semver = require('semver')

const hcRoot = process.cwd(); // __dirname + '/../../../..';
const parseBreak = /[\n\r]+/;
const parseJsdocLink = /\{@link\s+((?:[^\|]|\s)+?)(?:\|([^\}]|\s+?))?\}/;
const parseMarkdownLink = /\[([^\]]+?)\]\(((?:[^\)]|\s)+?)\)/;


const options = {
    _meta: {
        branch: '',
        commit: ''
    }
};

const products = []

function getLocation(option) {
    return {
        start:
            (option.leadingComments && option.leadingComments[0].loc.start) ||
            option.key.loc.start,
        end:
            (option.leadingComments && option.leadingComments[0].loc.end) ||
            option.key.loc.end
    };
}

const getPalette = () => {
    const palette1Path = fsPath.join(hcRoot, 'js', 'Core', 'Palette.js');
    const palette2Path = fsPath.join(hcRoot, 'js', 'Core', 'Color', 'Palette.js');
    const palette3Path = fsPath.join(hcRoot, 'ts', 'Core', 'Color', 'Palettes.ts');

    if (fs.existsSync(palette3Path)) {
        return (new Function(
            'const ' +
            fs
                .readFileSync(palette3Path)
                .toString()
                .match(/Palette {[^}]*}/g)[0]
                .replace(/=/g, ':')
                .replace('{', '= {') +
            '; return Palette;'
        )());
    }

    if (fs.existsSync(palette2Path)) {
        return (new Function(fs
            .readFileSync(palette2Path)
            .toString()
            .replace('export default palette;', '') +
            '; return palette;'
        )());
    }

    return (new Function(fs
        .readFileSync(palette1Path)
        .toString()
        .replace('export default palette;', '') +
        '; return palette;'
    )());
}

function dumpOptions() {
    fs.writeFile(
        'tree.json',
        JSON.stringify(
            options,
            undefined,
            '  '
        ),
        function () {
            //console.info('Wrote tree!');
        }
    );
}

function resolveBinaryExpression(node) {
    var val = '';
    var lside = '';
    var rside = '';

    if (node.left.type === 'Literal') {
        lside = node.left.value;
    }

    if (node.right.type === 'Literal') {
        rside = node.right.value;
    }

    if (node.left.type === 'BinaryExpression') {
        lside = resolveBinaryExpression(node.left);
    }

    if (node.right.type === 'BinaryExpression') {
        rside = resolveBinaryExpression(node.right);
    }

    if (node.operator === '+') {
        val = lside + rside;
    }

    // This is totally not needed, but maybe someone is doing something
    // really really strange, so might as well support it
    if (node.operator === '-') {
        val = lside - rside;
    }

    return val;
}

function decorateOptions(parent, target, option, filename) {

    const palette = getPalette();
    let index,
        comment = (
            option.leadingComments &&
            option.leadingComments[option.leadingComments.length - 1].value ||
            ''
        );

    if (!option) {
        console.error('WARN: decorateOptions called with no valid AST node');
        return;
    }

    if (
        comment &&
        (
            comment.indexOf('@ignore') !== -1 ||
            (
                // has manual decoration
                comment.indexOf('@apioption') !== -1 &&
                comment.indexOf('@type') !== -1
            )
        )
    ) {
        return;
    }

    index = (option.key.name || option.key.value); // `value` for literal keys

    if (parent && parent.length > 0) {
        parent += '.';
    }

    target[index] = target[index] || {
        doclet: {},
        // type: option.key.type,
        children: {}
    };

    // Look for the start of the doclet first
    var location = getLocation(option);


    target[index].meta = {
        fullname: parent + index,
        name: index,
        line: location.start.line,
        lineEnd: location.end.line,
        column: location.start.column,
        filename: filename//.replace('highcharts/', '')
    };

    if (option.value && option.value.type == 'ObjectExpression') {

        // This is a nested object probably
        option.value.properties.forEach(function (sub) {
            var s = {};

            s = target[index].children;

            decorateOptions(
                parent + index,
                s,
                sub,
                filename
            );
        });
    } else if (option.value && option.value.type === 'Literal') {
        target[index].meta.default = option.value.value;
        //target[option.key.name].meta.type = option.value.type;
    } else if (option.value && option.value.type === 'UnaryExpression') {
        if (option.value.argument && option.value.argument.type === 'Literal') {
            if (option.value.operator === 'void') {
                target[index].meta.default = 'undefined';
            } else {
                target[index].meta.default = option.value.operator + option.value.argument.value;
            }

            if (isNum(target[index].meta.default)) {
                target[index].meta.default = parseFloat(target[index].meta.default);
            }
        }
    } else if (option.value && option.value.type === 'BinaryExpression') {
        target[index].meta.default = resolveBinaryExpression(option.value);

    // Resolve palette
    } else if (
        option.value &&
        option.value.type == 'MemberExpression' &&
        option.value.object.name === 'palette'
    ) {
        const key = option.value.property.name;

        if (typeof key === 'string') {
            target[index].meta.default = palette[key];
        }

    } else {
        // if (option.leadingComments && option.leadingComments[0].value.indexOf('@apioption') >= 0) {
        //     console.info('OPTION:', option, 'COMMENT:', option.leadingComments);
        // }
    }



    // Add options decorations directly to the node
    option.highcharts = option.highcharts || {};
    option.highcharts.fullname = parent + index;
    option.highcharts.name = index;
    option.highcharts.isOption = true;

}

function appendComment(node, lines) {

    if (typeof node.comment !== 'undefined') {
        node.comment = node.comment.replace(/\/\*/g, '').replace(/\*\//g, '*');
        node.comment = '/**\n' + node.comment + '\n* ' + lines.join('\n* ') + '\n*/';
    } else {
        node.comment = '/**\n* ' + lines.join('\n* ') + '\n*/';
    }

    node.event = 'jsdocCommentFound';
}

function nodeVisitor(node, e, _, currentSourceName) {
    var target,
        parent,
        properties,
        fullPath,
        s,
        comment = (e.comment || '')
    ;

    if (node.highcharts && node.highcharts.isOption) {
        node.ignored = (
            node.ignored ||
            comment.indexOf('@ignore-option') > 0
        );
        if (node.ignored) {
            removeOption(node.highcharts.fullname);
        } else if (comment.indexOf('@apioption') < 0) {
            appendComment(e, ['@optionparent ' + node.highcharts.fullname]);
        } else if (comment.indexOf('@apioption tooltip') >= 0) {
            console.error(comment);
        }
        return;
    }

    if ((node.leadingComments || []).length === 0) {
        return;
    }

    if (!e.comment) {
        (node.leadingComments || []).some(function (c) {
            // We only use the one containing @optionparent
            comment = c.raw || c.value;
            if (comment.indexOf('@optionparent') >= 0) {
                return true;
            }
            return false;
        });

        e.comment = comment;
        // e.comment = node.leadingComments[0].raw || node.leadingComments[0].value;
    }

    s = e.comment.indexOf('@optionparent');

    if (s >= 0) {
        s = e.comment.substr(s).trim();
        fullPath = '';

        parent = s.split('\n')[0].trim().split(' ');

        if (parent && parent.length > 1) {
            parent = parent[1].trim() || '';

            s = parent.split('.');
            target = options;

            s.forEach(function (p, i) {
                // p = p.trim();

                fullPath = fullPath + (fullPath.length > 0 ? '.' : '') + p;

                target[p] = target[p] || {};

                target[p].doclet = target[p].doclet || {};
                target[p].children = target[p].children || {};

                var location = getLocation(node);
                target[p].meta = {
                    filename: currentSourceName,
                    name: p,
                    fullname: fullPath,
                    line: location.start.line,
                    lineEnd: location.end.line,
                    column: location.start.column
                };

                target = target[p].children;

            });
        } else {
            parent = '';
            target = options;
        }

        if (target) {
            if (
                node.type === 'CallExpression' &&
                (
                    node.callee.name === 'seriesType' ||
                    node.callee.property.name === 'seriesType'
                )
             ) {
                console.info('    found series type', node.arguments[0].value, '- inherited from', node.arguments[1].value);
                // console.info('    found series type:', JSON.stringify(node.arguments[2], undefined, '  '));
                properties = node.arguments[2].properties;
            } else if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression' && node.callee.property.name === 'setOptions') {
                properties = node.arguments[0].properties;
            } else if (node.type === 'ObjectExpression') {
                properties = node.properties;
            } else if (node.init && node.init.type === 'ObjectExpression') {
                properties = node.init.properties;
            } else if (node.value && node.value.type === 'ObjectExpression') {
                properties = node.value.properties;
            } else if (node.operator === '=' && node.right.type === 'ObjectExpression') {
                properties = node.right.properties;
            } else if (
                node.right &&
                node.right.type === 'CallExpression' &&
                node.right.callee.name === 'merge'
            ) {
                properties = node.right.arguments[node.right.arguments.length - 1].properties || [];
            } else if (
                node.right &&
                node.right.type === 'CallExpression' &&
                node.right.callee.property.name === 'seriesType'
            ) {
                console.info('    found series type', node.right.arguments[0].value, '- inherited from', node.right.arguments[1].value);
                properties = node.right.arguments[2].properties;
            } else {
                logger.error('code tagged with @optionparent must be an object:', currentSourceName, node);
            }

            if (properties) {
                properties.forEach(function (child) {
                    decorateOptions(parent, target, child, e.filename || currentSourceName);
                });
            } else {
                console.error('INVALID properties for node', node);
            }
        } else {
            logger.error('@optionparent is missing an argument');
        }
    }
}

////////////////////////////////////////////////////////////////////////////////

function isNum(what) {
    return !isNaN(parseFloat(what)) && isFinite(what);
};

function isBool (what) {
    return (what === true || what === false);
};

function isStr (what) {
    return (typeof what === 'string' || what instanceof String);
};

function removeIgnoredOptions(node) {

    if (!node.children) {
        return;
    }

    Object
        .keys(node.children)
        .forEach(childName => {
            const childNode = node.children[childName];
            if (childNode.doclet &&
                childNode.doclet.ignored
            ) {
                delete node.children[childName];
            } else {
                removeIgnoredOptions(childNode);
            }
        });
}

function improveDescription(node) {

    let description = (node.doclet && node.doclet.description);

    if (description) {
        node.doclet.description = description
            .trim()
            .replace(
                new RegExp(parseJsdocLink, 'g'),
                (match, url, text) => (
                    '{@link ' + url.replace(new RegExp(parseBreak, 'g'), '') +
                    (text ? '|' + text.trim() : '') + '}'
                )
            )
            .replace(
                new RegExp(parseMarkdownLink, 'g'),
                (match, text, url) => (
                    '[' + text.trim() + '](' +
                    url.replace(new RegExp(parseBreak, 'g'), '') + ')'
                )
            );
    }

    let children = node.children;

    if (children) {
        Object.keys(children).forEach(key => improveDescription(children[key]));
    }
}

function _inferVersion(node, parentDeprecated, parentSince) {
    if (!node.doclet ||
        !node.doclet.description
    ) {
        return;
    }

    if (node.doclet.since &&
        !semver.valid(node.doclet.since)
    ) {
        node.doclet.since += '.0';
        if (!semver.valid(node.doclet.since)) {
            delete node.doclet.since;
        }
    }
    if (semver.valid(parentSince) &&
        (
            !node.doclet.since ||
            semver.compare(node.doclet.since, parentSince) < 0
        )
    ) {
        node.doclet.since = parentSince;
    }

    if (typeof node.doclet.deprecated === 'string' &&
        !semver.valid(node.doclet.deprecated)
    ) {
        node.doclet.deprecated += '.0';
        if (!semver.valid(node.doclet.deprecated)) {
            delete node.doclet.deprecated;
        }
    }
    if (semver.valid(parentDeprecated) &&
        (
            !node.doclet.deprecated ||
            semver.compare(node.doclet.deprecated, parentDeprecated) < 0
        )
    ) {
        node.doclet.deprecated = parentDeprecated;
    }
}

function inferVersion(node, parentDeprecated, parentSince) {

    _inferVersion(node, parentDeprecated, parentSince);

    const children = node.children;

    if (!children) {
        return;
    }

    Object
        .keys(children)
        .map(key => children[key])
        .forEach(child => inferVersion(
            child,
            node.doclet?.deprecated,
            node.doclet?.since
        ));
}

function _inferValue(value, types) {

    const typesLength = types.length;

    let typesIndex = -1;

    while (
        ++typesIndex < typesLength &&
        types.indexOf(typeof value) === -1
    ) {
        switch (types[typesIndex]) {
            case 'boolean':
                switch (value) {
                    case 'false':
                        return false;
                    case 'true':
                        return true;
                }
                break;
            case 'number':
                if (!Number.isNaN(new Number(value))) {
                    return new Number(value);
                }
                break;
            case 'null':
                return null;
        }
    }

    return value;
}

function inferValue(obj) {

    // check type format for defaults
    if (
        typeof obj.doclet !== 'undefined' &&
        typeof obj.doclet.type !== 'undefined'
    ) {

        const types = obj.doclet.type.names;

        if (typeof obj.meta.default !== 'undefined') {
            obj.doclet.default = _inferValue(obj.meta.default, types);
        }

        if (typeof obj.meta.defaultvalue !== 'undefined') {
            obj.doclet.defaultvalue = _inferValue(obj.meta.default, types);
        }

        if (typeof obj.doclet.defaultByProduct !== 'undefined') {
            for (let product in obj.doclet.defaultByProduct) {
                obj.doclet.defaultByProduct[product] = _inferValue(obj.doclet.defaultByProduct[product], types);
            }
        }
    }

    // Infer types
    if (obj.children) {
        Object.keys(obj.children).forEach(name => inferValue(obj.children[name]));
    }
}

function _inferType(node) {
    var defVal;

    node.doclet = node.doclet || {};
    node.meta = node.meta || {};

    // remove JSDoc specific flag
    delete node.doclet.undocumented;

    if (
        typeof node.doclet.extends !== 'undefined' ||
        typeof node.doclet.type !== 'undefined'
    ) {
        // We allready have a type, so no infering is required
        return;
    }

    defVal = node.doclet.defaultvalue;

    if (
        typeof node.meta.default !== 'undefined' &&
        typeof node.doclet.defaultvalue === 'undefined'
    ) {
        defVal = node.meta.default;
    }

    if (typeof defVal === 'undefined') {
        //  If this node has children, it is the any type.
        if (node.children && Object.keys(node.children).length) {
            node.doclet.type = {
                names: ['*']
            };
        }

        // We can not infer this type, so abort.
        return;
    }

    node.doclet.type = { names: [] };

    if (
        isBool(defVal) ||
        defVal === 'false' ||
        defVal === 'true'
    ) {
        node.doclet.type.names.push('boolean');
    } else if (
        isNum(defVal) ||
        /^\d+(\.\d+)?/.test(defVal)
    ) {
        node.doclet.type.names.push('number');
    } else if (
        isStr(defVal)
    ) {
        node.doclet.type.names.push('string');
    }

    // If we were unable to deduce a type, it is the any type.
    if (node.doclet.type.names.length === 0) {
        node.doclet.type.names.push('*');
    }

}

function inferType(obj) {
    _inferType(obj);

    if (obj.meta && obj.meta.filename) {
        // Remove user-identifiable info in filename
        obj.meta.filename = obj.meta.filename
            .replace(/\\/g, '/')
            .replace(/.*\/(js\/.*)/, '$1');
    }

    // Infer types
    if (obj.children) {
        Object.keys(obj.children).forEach(name => {
            // work around #8260:
            if (name === '' || name === 'undefined') {
                delete obj.children[name];
            } else if (name[0] !== '_') {
                inferType(obj.children[name]);
            }
        });
    }
}

function _inferProduct(node) {
    const inferProducts = ((node.doclet && node.doclet.products) || []).slice();
    const blacklistMode = inferProducts.some(product => product[0] === '-');

    if (blacklistMode) {
        node.doclet.products = products.filter(product => !inferProducts.includes('-' + product));
    }
}

function inferProduct(obj) {
    _inferProduct(obj);

    if (obj.children) {
        Object.keys(obj.children).forEach(key => inferProduct(obj.children[key]));
    }
}

function augmentOption(path, obj) {
    // This is super nasty.
    var current = options,
        p = (path || '').trim().split('.')
    ;

    if (!obj) {
        return;
    }

    try {

        p.forEach(function (thing, i) {
            // thing = thing.trim();

            if (i === p.length - 1) {
                // Merge in stuff
                current[thing] = current[thing] || {};

                current[thing].doclet = current[thing].doclet || {};
                current[thing].children = current[thing].children || {};
                current[thing].meta = current[thing].meta || {};

                // Free floating doclets marked with @apioption
                if (!current[thing].meta.filename) {
                    current[thing].meta.filename = obj.meta.path + '/' + obj.meta.filename;
                    current[thing].meta.line = obj.meta.lineno;
                    current[thing].meta.lineEnd = obj.meta.lineno + obj.comment.split(/\n/g).length - 1;
                }

                Object.keys(obj).forEach(function (property) {
                    if (property !== 'comment' && property !== 'meta') {
                        current[thing].doclet[property] = obj[property];
                    }
                });
                return;
            }

            current[thing] = current[thing] || {children: {}};
            current = current[thing].children;
        });

    } catch (e) {
        console.error('ERROR deducing path', path);
    }
}

function removeOption(path) {
    var current = options,
        p = (path || '').split('.')
    ;

    if (!p) {
        return;
    }

    p.some(function (thing, i) {
        if (i === p.length - 1) {
            delete current[thing];
            return true;
        }

        if (!current[thing]) {
            return true;
        }

        current = current[thing].children;
    });
}

/**
 * Removes empty children of a node.
 */
function removeEmptyNodes (node) {

    if (!node.children) {
        return;
    }

    const children = node.children;
    const isRoot = node.children._meta;

    Object
        .keys(children)
        .filter(key => key !== '_meta')
        .forEach(key => {
            if ((
                !isRoot
            ) && (
                !children[key].doclet ||
                Object.keys(children[key].doclet).length === 0
            ) && (
                !children[key].children ||
                Object.keys(children[key].children).length === 0
            )) {
                delete children[key];
            } else {
                removeEmptyNodes(children[key]);
            }
        });
}

/**
 * Resolve properties where the product can be specified like {highcharts|highmaps}
 * etc. Return an object with value and products.
 */
function resolveProductTypes(doclet, tagObj) {
    var reg = /^\{([a-z\|]+)\}/g,
        match = tagObj.value.match(reg),
        products,
        value = tagObj.value;

    if (match) {
        value = value.replace(reg, '');
        products = match[0].replace('{', '').replace('}', '').split('|');
    }

    return doclet[tagObj.originalTitle] = {
        value: value.trim(),
        products: products
    };
}

/**
 * Sorts all children of a node in alphabetical ascending order.
 */
function sortNodes (node) {

    if (!node.children) {
        return;
    }

    let childrenReferences;

    if (node.doclet && node.meta) {
        childrenReferences = node.children;
        delete node.children;
        node.children = childrenReferences;
    }

    const children = node.children;

    childrenReferences = {};

    Object
        .keys(children)
        .forEach(key => {
            childrenReferences[key] = children[key];
            delete children[key];
        });
    Object
        .keys(childrenReferences)
        .sort()
        .forEach(key => {
            children[key] = childrenReferences[key];
            sortNodes(children[key]);
        });
}

////////////////////////////////////////////////////////////////////////////////

exports.defineTags = function (dictionary) {

    dictionary.defineTag('apioption', {
        onTagged: function (doclet, tagObj) {
            if (doclet.ignored) removeOption(tagObj.value);
            augmentOption(tagObj.value, doclet);
        }
    });

    dictionary.defineTag('context', {
      onTagged: function (doclet, tagObj) {
            doclet.context = tagObj.value;
      }
    });

    dictionary.defineTag('declare', {
        mustHaveValue: true,
        mustNotHaveDescription: true,
        onTagged: function (doclet, tag) {
            doclet.declare = tag.value;
        }
    });

    dictionary.defineTag('deprecated', {
        onTagged: function (doclet, tag) {
            doclet.deprecated = tag.value || true;
        }
    });

    dictionary.defineTag('exclude', {
        synonyms: ['excluding'],
        onTagged: function (doclet, tagObj) {
            var items = tagObj.text.split(',');

            doclet.exclude = doclet.exclude || [];

            items.forEach(function (entry) {
                doclet.exclude.push(entry.trim());
            });
        }
    });

    dictionary.defineTag('extends', {
        onTagged: function (doclet, tagObj) {
            doclet.extends = tagObj.value;
        }
    });

    dictionary.defineTag('ignore-option', {
        onTagged: function (doclet) {
            doclet.ignored = true;
        }
    });

    dictionary.defineTag('internal', {
        onTagged: function (doclet) {
            doclet.internal = true;
        }
    });

    dictionary.defineTag('default', {
        onTagged: function (doclet, tagObj) {

            if (typeof tagObj.value === 'undefined') {
                return;
            }

            if (
                tagObj.value.indexOf('highcharts') < 0 &&
                tagObj.value.indexOf('highmaps') < 0 &&
                tagObj.value.indexOf('highstock') < 0 &&
                tagObj.value.indexOf('gantt') < 0
            ) {
                doclet.defaultvalue = tagObj.text;
                return;
            }

            var valueObj = resolveProductTypes(doclet, tagObj);

            doclet.defaultByProduct = doclet.defaultByProduct || {};

            (valueObj.products || []).forEach(function (p) {
                doclet.defaultByProduct[p] = valueObj.value;
            });

            //var parsed = parseTag(tagObj.value, true, true);
            //doclet.defaultvalue = parsed;
        }
    });
    dictionary.defineTag('optionparent', {
        onTagged: function (doclet, tagObj) {
            if (doclet.ignored) return removeOption(tagObj.value);
            augmentOption(tagObj.value, doclet);
        }
    });

    dictionary.defineTag('private', {
        mustNotHaveValue: true,
        onTagged: function (doclet) {
            doclet.comment = doclet.comment.replace(/@private\s*$/gm, '');
        }
    });

    dictionary.defineTag('product', {
        onTagged: function (doclet, tagObj) {
            var adds = tagObj.value.split(' ');
            doclet.products = doclet.products || [];

            // Need to make sure we don't add dupes
            adds.forEach(function (add) {
                if (!doclet.products.includes(add)) {
                    doclet.products.push(add);
                }
                if (add[0] === '-') {
                    add = add.substr(1);
                }
                if (!products.includes(add)) {
                    products.push(add);
                }
            });
        }
    });

    dictionary.defineTag('productdesc', {
        onTagged: resolveProductTypes
    });

    dictionary.defineTag('requires', {
        mustHaveValue: true,
        mustNotHaveDescription: true,
        onTagged: function (doclet, tag) {
            var require = tag.value;
            doclet.requires = (doclet.requires || []);
            doclet.requires.push(
                require.indexOf(':') === -1 ?
                    'module:' + require :
                    require
            );
        }
    });

    dictionary.defineTag('sample', {
        onTagged: function (doclet, tagObj) {

            var valueObj = resolveProductTypes(doclet, tagObj);

            var text = valueObj.value;

            var del = text.search(/\s/),
                name = text.substr(del).trim().replace(/\s\s+/g, ' '),
                value = text.substr(0, del).trim(),
                folder = hcRoot + /samples/ + value
            ;

            doclet.samples = doclet.samples || [];

            if (!fs.existsSync(folder)) {
                console.error('@sample does not exist: ' + value);
            }
            doclet.samples.push({
                name: name,
                value: value,
                products: valueObj.products
            });
        }
    });

    dictionary.defineTag('values', {
        synonyms: ['validvalue'],
        onTagged: function (doclet, tagObj) {
            doclet.values = tagObj.value;
        }
    });

    dictionary.defineTag('typedesc', {
        onTagged: function (doclet, tagObj) {
            if (!doclet.type) {
                doclet.type = {};
            }
            doclet.type.description = tagObj.value;
        }
    });
};

exports.astNodeVisitor = {
    visitNode: nodeVisitor
};

exports.handlers = {

    beforeParse: function (e) {
        var palette = getPalette();

        // Resolve palette in doclets
        Object.keys(palette).forEach(function (key) {
            var reg = new RegExp('\\$\\{palette\\.' + key + '\\}', 'g');

            e.source = e.source.replace(
                reg,
                palette[key]
            );
        });

        var match = e.source.match(
            /(\s*)\/\*\*(?:\1 \*[^\n]*)+\1 \*\/[\s]+\}/g
        );
        if (match && match.some(m =>
                m.indexOf('@apioption') === -1 &&
                m.indexOf('@name') === -1
        )) {
            console.error(
`Warning: Detected ${match.length} cases of a comment followed by } in
${e.filename}. This may lead to loose doclets not being parsed into the API.
Move them up before functional code for JSDoc to see them.`.yellow
            );
        }

    },

    jsdocCommentFound: function (e) {

    },

    newDoclet: function (e) {

    },

    parseComplete: function () {
        options._meta.version = require(hcRoot  + '/package.json').version;
        options._meta.commit = exec('git rev-parse --short HEAD', {cwd: process.cwd()}).toString().trim();
        options._meta.branch = exec('git rev-parse --abbrev-ref HEAD', {cwd: process.cwd()}).toString().trim();
        options._meta.date = (new Date()).toString();

        removeIgnoredOptions({children: options});
        inferVersion({children: options});
        inferType({children: options});
        inferProduct({children: options});
        inferValue({children: options});
        improveDescription({children: options});

        function addSeriesTypeDescription(type) {
            var node = type;

            // Make sense of the examples for general series
            if (type === 'series') {
                type = 'line';
            }
            var s = `

In TypeScript the [type](series.${type}.type) option must always be set.

Configuration options for the series are given in three levels:
1. Options for all series in a chart are defined in the
   [plotOptions.series](plotOptions.series) object.
2. Options for all \`${type}\` series are defined in
   [plotOptions.${type}](plotOptions.${type}).
3. Options for one single series are given in
   [the series instance array](series.${type}).

\`\`\`
Highcharts.chart('container', {
    plotOptions: {
        series: {
            // general options for all series
        },
        ${type}: {
            // shared options for all ${type} series
        }
    },
    series: [{
        // specific options for this series instance
        type: '${type}'
    }]
});
\`\`\`
            `;
            if (options.plotOptions.children[node] &&
                options.plotOptions.children[node].doclet.description
            ) {
                options.plotOptions.children[node].doclet.description += s;
            }
            if (options.series.children[node] &&
                options.series.children[node].doclet.description
            ) {
                options.series.children[node].doclet.description += s;
            }
        }

        Object.keys(options.plotOptions.children).forEach(addSeriesTypeDescription);

        removeEmptyNodes({ children: options });
        sortNodes({ children: options });
        dumpOptions();
    }
};
