/*
 * Copyright (C) Highsoft AS
 */

/**
 * Returns the possible values
 *
 * @param {IArguments} arguments
 *
 * @return {Array}
 */
function getValues (arguments) {

    var values = Array.prototype.slice.call(arguments);

    values.pop();
    values.shift();

    return values;
}

module.exports = {
    ifValue: function () {

        var value = arguments[0];
        var options = arguments[arguments.length-1];
        var values = getValues(arguments);

        return (
            values.some(v => v == value) ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    ifNotValue: function () {

        var value = arguments[0];
        var options = arguments[arguments.length-1];
        var values = getValues(arguments);

        return (
            !values.some(v => v == value) ?
                options.fn(this) :
                options.inverse(this)
        );
    }
};
