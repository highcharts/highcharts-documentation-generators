/*
 * Copyright (C) Highsoft AS
 */

module.exports = {
    isArray: function (value, options) {
        return (
            typeof value === 'object' &&
            value instanceof Array ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isBoolean: function (value, options) {
        return (
            typeof value === 'boolean' || value instanceof Boolean ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isNotArray: function (value, options) {
        return (
            typeof value !== 'object' ||
            value === null ||
            value.constructor !== Array ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isNotBoolean: function (value, options) {
        return (
            typeof value !== 'boolean' && !(value instanceof Boolean) ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isNotNull: function (value, options) {
        return (
            typeof value !== 'undefined' && value !== null ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isNotNumber: function (value, options) {
        return (
            typeof value !== 'number' && !(value instanceof Number) ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isNotObject: function (value, options) {
        return (
            typeof value !== 'object' ||
            value === null ||
            value instanceof Array ||
            value instanceof Boolean ||
            value instanceof Number ||
            value instanceof String ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isNotPrimitive: function (value, options) {
        return (
            typeof value === 'object' &&
            !(value instanceof Boolean) &&
            !(value instanceof Number) &&
            !(value instanceof String) &&
            value !== null ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isNotString: function (value, options) {
        return (
            typeof value !== 'string' && !(value instanceof String) ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isNull: function (value, options) {
        return (
            typeof value === 'undefined' || value === null ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isNumber: function (value, options) {
        return (
            typeof value === 'number' || value instanceof Number ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isObject: function (value, options) {
        return (
            typeof value === 'object' &&
            value !== null &&
            !(value instanceof Array) &&
            !(value instanceof Boolean) &&
            !(value instanceof Number) &&
            !(value instanceof String) ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isPrimitive: function (value, options) {
        return (
            typeof value !== 'object' ||
            value instanceof Boolean ||
            value instanceof Number ||
            value instanceof String ||
            value === null ?
                options.fn(this) :
                options.inverse(this)
        );
    },
    isString: function (value, options) {
        return (
            typeof value === 'string' || value instanceof String ?
                options.fn(this) :
                options.inverse(this)
        );
    }
};
