/*
 * Copyright (C) Highsoft AS
 */

/**
 * Changes the case of a name with dashes or low dashes.
 *
 * @param {string} name 
 *
 * @return {string}
 */
function changeCase (name) {
    return name.replace(
        /[\-_][a-z]/g,
        match => match[1].toUpperCase()
    );
}

module.exports = {

    CamelCase: function (name) {

        if (!name) {
            return name;
        }

        name = changeCase(name);

        return name[0].toUpperCase() + name.substr(1);
    },

    camelCase: function (name) {

        if (!name) {
            return name;
        }

        return changeCase(name);
    }
}
