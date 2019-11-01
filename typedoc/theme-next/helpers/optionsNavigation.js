/*
 * Copyright (C) Highsoft AS
 */

function optionsFilter(navigationItem) {
    if (navigationItem.children) {
        navigationItem.children = navigationItem.children.filter(optionsFilter);
        if (navigationItem.children.length === 0) {
            delete navigationItem.children;
        }
    }
    if (
        navigationItem.title.endsWith('Options') ||
        navigationItem.title.endsWith('OptionsObject')
    ) {
        return navigationItem;
    }
    if (navigationItem.children) {
        return optionsFilter(navigationItem.children[0]);
    }
}

module.exports = {
    optionsNavigation: function (context, options) {
        return options.fn(optionsFilter(context));
        switch (typeof value) {
            default:
                return typeof value;
            case 'object':
                if (value === null) {
                    return 'null';
                }
                return value.constructor.name;
        }
    }
};
