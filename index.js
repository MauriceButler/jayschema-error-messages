function getFieldName(error){
    if(error.instanceContext.length > 2){
        return error.instanceContext.slice(2);
    } else {
        return error.constraintValue[0];
    }
}

function getValidMessage(error){
    switch(error.constraintName){
        case 'required':
            return 'Required';
        case 'minimum':
            return 'Must be greater than ' + error.constraintValue;
        case 'maximum':
            return 'Must be less than ' + error.constraintValue;
        case 'type':
            return 'Should be a ' + error.constraintValue;
        case 'minLength':
            return 'Must be longer than ' + error.constraintValue + ' characters';
        case 'maxLength':
            return 'Must be shorter than ' + error.constraintValue + ' characters';
        case 'format':
            if(error.constraintValue === 'date-time'){
                return 'Should be a date';
            } else {
                return JSON.stringify(error);
            }
            break;
        default:
            return JSON.stringify(error);
    }
}

function addMessage(fields, error, fieldName){
    var field,
        message;

    field = fieldName || getFieldName(error);
    message = getValidMessage(error);


    if(!fields[field]){
        fields[field] = [];
    }

    fields[field].push(message);
}

function normaliseErrorMessages(errors){
    var fields = {};

    errors.forEach(function(error){

        if(error.constraintName === 'required'){
            var requiredFields = error.desc.split(': ')[1].split(',');
            for (var i = 0; i < requiredFields.length; i++) {
                addMessage(fields, error, requiredFields[i]);
            }
        } else {
            addMessage(fields, error);
        }


    });

    return {
        fields: fields
    };

}

module.exports = normaliseErrorMessages;