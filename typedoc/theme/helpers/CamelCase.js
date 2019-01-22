module.exports = {
    CamelCase: function(name) {
        if (!name) {
            return name;
        }
        return (
            name[0].toUpperCase() +
            name.replace(/[\-_][a-z]/g, match => match[1].toUpperCase())
        );
    },
    camelCase: function(name) {
        if (!name) {
            return name;
        }
        return name.replace(/[\-_][a-z]/g, match => match[1].toUpperCase());
    }
}
