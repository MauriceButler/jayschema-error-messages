function getGrammaticlSingular(type) {

    switch (type) {
        case 'string':
            return 'a string';
        case 'number':
            return 'a number';
        case 'integer':
            return 'an integer';
        case 'object':
            return 'an object';
        case 'array':
            return 'an array';
        case 'boolean':
            return 'a boolean';
        case 'null':
            return 'null';
        default:
            return 'a ' + type;
    }
}

function getFieldName(error) {
    return error.params.missingProperty || error.params.additionalProperty || error.dataPath && error.dataPath.replace(".", "");
}

function getFormatErrorMessage(error) {
    switch (error.params.format) {
        case 'date-time':
            return 'Should be a date';
        case 'email':
            return 'Should be a valid email address';
        case 'ipv4':
            return 'Should be a dotted-quad IPv4 address';
        case 'ipv6':
            return 'Should be a valid IPv6 address';
        case 'uri':
            return 'Should be a valid uri';
        default:
            return JSON.stringify(error);
    }
}

function getValidMessage(error) {
    switch (error.keyword) {
        case 'required':
            return 'Is required';
        case 'minimum':
            return 'Must be greater than ' + error.params.limit;
        case 'maximum':
            return 'Must be less than ' + error.params.limit;
        case 'type':
            return 'Should be ' + getGrammaticlSingular(error.params.type);
        case 'minLength':
            return 'Must be longer than ' + error.params.limit + ' characters';
        case 'maxLength':
            return 'Must be shorter than ' + error.params.limit + ' characters';
        case 'maxItems':
            return 'Must have no more than ' + error.params.limit + ' items';
        case 'minItems':
            return 'Must have at least ' + error.params.limit + ' items';
        case 'format':
            return getFormatErrorMessage(error);
        case 'pattern':
            return 'Invalid format';
        case 'additionalProperties':
            return 'Additional property not allowed';
        default:
            return error.message;
    }
}

function addMessage(fields, error, fieldName) {
    var field,
        message;

    field = fieldName || getFieldName(error);
    message = getValidMessage(error);


    if (!fields[field]) {
        fields[field] = [];
    }

    fields[field].push(message);
}

function normaliseErrorMessages(errors) {
    var fields = {};
    console.log(errors);
    errors.forEach(function (error) {

        addMessage(fields, error);


    });

    return {
        fields: fields
    };

}

module.exports = normaliseErrorMessages;
