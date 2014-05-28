#jayschema-error-messages

Normalises the crazy error objects that get returned from JaySchema.

JaySchema can return some strangely formatted error objects such as the below.

This module normalises them into something sane and actionable.

##Usage

    var normalise = require('jayschema-error-messages');

    var errorsReturnedFromJaySchema = [
            {
                instanceContext: '#',
                constraintName: 'required',
                constraintValue: [ 'test1', 'foo', 'bar'],
                desc: 'missing: test1,test2',
                kind: 'ObjectValidationError'
            },
            {
                instanceContext: '#/test3',
                constraintName: 'minimum',
                constraintValue: 4,
                testedValue: 3,
                kind: 'NumericValidationError'
            }
        ];

    var normalisedErrors = normalise(errorsReturnedFromJaySchema);

    console.log(normalisedErrors);

results in

    {
        fields: {
            test1: [ 'Required' ],
            foo: [ 'Required' ],
            test2: [ 'Must be greater than 4' ]
        }
    }
