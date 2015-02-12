var normalise = require('../'),
    test = require('tape');


test('normalise Exists', function (t) {
    t.plan(2);
    t.ok(normalise, 'normalise Exists');
    t.equal(typeof normalise, 'function',  'normalise is a function');
});


test('normalise returns correct messages', function (t) {
    t.plan(22);

    var testErrors = [
        {
            instanceContext: '#',
            constraintName: 'required',
            constraintValue: [ 'test1', 'foo', 'bar'],
            desc: 'missing: test1,foo',
            kind: 'ObjectValidationError'
        },
        {
            instanceContext: '#/minimum',
            constraintName: 'minimum',
            constraintValue: 4,
            testedValue: 3,
            kind: 'NumericValidationError'
        },
        {
            instanceContext: '#/maximum',
            constraintName: 'maximum',
            constraintValue: 8,
            testedValue: 10,
            kind: 'NumericValidationError'
        },
        {
            instanceContext: '#/array',
            constraintName: 'maxItems',
            constraintValue: 1,
            testedValue: 2,
            kind: 'ArrayValidationError'
        },
        {
            instanceContext: '#/array',
            constraintName: 'minItems',
            constraintValue: 2,
            testedValue: 1,
            kind: 'ArrayValidationError'
        },
        {
            instanceContext: '#/array',
            constraintName: 'type',
            constraintValue: 'array',
            testedValue: 'string'
        },
        {
            instanceContext: '#/object',
            constraintName: 'type',
            constraintValue: 'object',
            testedValue: 'string'
        },
        {
            instanceContext: '#/string',
            constraintName: 'type',
            constraintValue: 'string',
            testedValue: 'object'
        },
        {
            instanceContext: '#/minLength',
            constraintName: 'minLength',
            constraintValue: 7,
            testedValue: 3,
            kind: 'StringValidationError'
        },
        {
            instanceContext: '#/maxLength',
            constraintName: 'maxLength',
            constraintValue: 5,
            testedValue: 8,
            kind: 'StringValidationError'
        },
        {
            instanceContext: '#/datetime',
            constraintName: 'format',
            constraintValue: 'date-time',
            testedValue: 'not a date',
            desc: 'not a valid date-time per RFC 3339 section 5.6 (use "date" for date-only or "time" for time-only)',
            kind: 'FormatValidationError'
        },
        {
            instanceContext: '#/pattern',
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
        },
        {
            instanceContext:'#/email',
            constraintName: 'format',
            constraintValue: 'email',
            testedValue: 'foo',
            kind: 'FormatValidationError'
        },
        {
            instanceContext:'#/ipv4',
            constraintName: 'format',
            constraintValue: 'ipv4',
            testedValue: 'foo',
            kind: 'FormatValidationError'
        },
        {
            instanceContext:'#/ipv6',
            constraintName: 'format',
            constraintValue: 'ipv6',
            testedValue: 'foo',
            kind: 'FormatValidationError'
        },
        {
            instanceContext:'#/uri',
            constraintName: 'format',
            constraintValue: 'uri',
            testedValue: 'foo',
            kind: 'FormatValidationError'
        }
    ];

    var errors = normalise(testErrors);

    t.ok(errors, 'errors returned');

    var errorKeys = Object.keys(errors);
    t.equal(errorKeys.length, 1, 'correct error keys');

    t.ok(errors.fields, 'fields exists');
    var fieldKeys = Object.keys(errors.fields);

    t.equal(fieldKeys.length, 16, 'correct number of fields');

    t.equal(errors.fields.test1[0], 'Required', 'Correct required message');
    t.equal(errors.fields.foo[0], 'Required', 'Correct required message');
    t.equal(errors.fields.minimum[0], 'Must be greater than 4', 'Correct minimum message');
    t.equal(errors.fields.maximum[0], 'Must be less than 8', 'Correct maximum message');
    t.equal(errors.fields.array[0], 'Must have no more than 1 items', 'Correct type message');
    t.equal(errors.fields.array[1], 'Must have at least 2 items', 'Correct type message');
    t.equal(errors.fields.array[2], 'Should be an array', 'Correct type message');
    t.equal(errors.fields.object[0], 'Should be an object', 'Correct type message');
    t.equal(errors.fields.string[0], 'Should be a string', 'Correct type message');
    t.equal(errors.fields.minLength[0], 'Must be longer than 7 characters', 'Correct minLength message');
    t.equal(errors.fields.maxLength[0], 'Must be shorter than 5 characters', 'Correct maxLength message');
    t.equal(errors.fields.datetime[0], 'Should be a date', 'Correct date format message');
    t.equal(errors.fields.pattern[0], 'Invalid format', 'Correct regex format message');
    t.equal(errors.fields.email[0], 'Should be a valid email address', 'Correct email format message');
    t.equal(errors.fields.ipv4[0], 'Should be a dotted-quad IPv4 address', 'Correct ipv4 format message');
    t.equal(errors.fields.ipv6[0], 'Should be a valid IPv6 address', 'Correct ipv6 format message');
    t.equal(errors.fields.uri[0], 'Should be a valid uri', 'Correct uri format message');
    t.equal(errors.fields.additionalProperties[0], 'Additional property "clientId" not allowed', 'Correct format message');

});