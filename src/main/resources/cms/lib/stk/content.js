exports.content = {};

// Check if content exists at path
exports.content.exists = function(path) {
    var result = execute('content.get', {
        key: path
    });

    return result ? true : false;
};