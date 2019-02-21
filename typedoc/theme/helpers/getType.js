/*
 * Copyright (C) Highsoft AS
 */

module.exports = {
    getType: function (value) {
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
