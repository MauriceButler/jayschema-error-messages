var normalise = require('../'),
    test = require('grape');


test('normalise Exists', function (t) {
    t.plan(2);
    t.ok(normalise, 'normalise Exists');
    t.equal(typeof normalise, 'function',  'normalise is a function');
});


test('normalise returns correct messages', function (t) {
    t.plan(14);

    var testErrors = [
        {
            instanceContext: '#',
            constraintName: 'required',
            constraintValue: [ 'test1', 'foo', 'bar'],
            desc: 'missing: test1,foo',
            kind: 'ObjectValidationError'
        },
        {
            instanceContext: '#/test2',
            constraintName: 'minimum',
            constraintValue: 4,
            testedValue: 3,
            kind: 'NumericValidationError'
        },
        {
            instanceContext: '#/test3',
            constraintName: 'maximum',
            constraintValue: 8,
            testedValue: 10,
            kind: 'NumericValidationError'
        },
        {
            instanceContext: '#/test4',
            constraintName: 'type',
            constraintValue: 'array',
            testedValue: 'string'
        },
        {
            instanceContext: '#/test5',
            constraintName: 'minLength',
            constraintValue: 7,
            testedValue: 3,
            kind: 'StringValidationError'
        },
        {
            instanceContext: '#/test6',
            constraintName: 'maxLength',
            constraintValue: 5,
            testedValue: 8,
            kind: 'StringValidationError'
        },
        {
            instanceContext: '#/test7',
            constraintName: 'format',
            constraintValue: 'date-time',
            testedValue: 'not a date',
            desc: 'not a valid date-time per RFC 3339 section 5.6 (use "date" for date-only or "time" for time-only)',
            kind: 'FormatValidationError'
        },
        {
            instanceContext: '#/test8',
            constraintName: 'pattern',
            constraintValue: '/^[0-9a-fA-F]{24}$/',
            testedValue: 'does not match pattern',
            kind: 'StringValidationError'
        },
        {
            instanceContext: '#',
            constraintName: 'additionalProperties',
            testedValue: 'clientId',
            desc: 'property "clientId" not allowed by "properties" or by "patternProperties" and "additionalProperties" is false',
            kind: 'ObjectValidationError'
        }
    ];

    var errors = normalise(testErrors);

    t.ok(errors, 'errors returned');

    var errorKeys = Object.keys(errors);
    t.equal(errorKeys.length, 1, 'correct error keys');

    t.ok(errors.fields, 'fields exists');
    var fieldKeys = Object.keys(errors.fields);

    t.equal(fieldKeys.length, 10, 'correct number of fields');

    t.equal(errors.fields.test1[0], 'Required', 'Correct required message');
    t.equal(errors.fields.foo[0], 'Required', 'Correct required message');
    t.equal(errors.fields.test2[0], 'Must be greater than 4', 'Correct minimum message');
    t.equal(errors.fields.test3[0], 'Must be less than 8', 'Correct maximum message');
    t.equal(errors.fields.test4[0], 'Should be a array', 'Correct type message');
    t.equal(errors.fields.test5[0], 'Must be longer than 7 characters', 'Correct minLength message');
    t.equal(errors.fields.test6[0], 'Must be shorter than 5 characters', 'Correct maxLength message');
    t.equal(errors.fields.test7[0], 'Should be a date', 'Correct format message');
    t.equal(errors.fields.test8[0], 'Invalid format', 'Correct format message');
    t.equal(errors.fields.additionalProperties[0], 'Additional property "clientId" not allowed', 'Correct format message');

});