exports.content = {};

// Get content by key (path or id)
exports.content.get = function(key) {
    return execute('content.get', {
        key: key
    });
};

// Check if content exists at path
exports.content.exists = function(path) {
    return exports.content.get(path) ? true : false;
};

// Get content property
exports.content.getProperty = function(key, property) {
    if (!key || !property) {
        return null;
    }
    var result = exports.content.get(key);
    return result ? result[property] : null;
};

