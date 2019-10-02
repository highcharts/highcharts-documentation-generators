/*
 * Copyright (C) Highsoft AS
 */

module.exports = {
    withTypeReflection: function (context, options) {
        if (context.type) {
            return options.fn(context.findReflectionByName(context.type.type));
        }
    }
};
