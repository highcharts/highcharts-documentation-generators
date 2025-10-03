'use strict';
exports.defineTags = function (dictionary) {
    dictionary.defineTag('internal', {
        onTagged: (doclet) => doclet.ignore = true
    });
};
