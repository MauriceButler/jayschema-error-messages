#jayschema-error-messages

Normalises the crazy error objects that get returned from JaySchema.

JaySchema can return some strangely formatted error objects such as the below.

This module normalises them into something sane and actionable.

##Usage

    var normalise = require('jayschema-error-messages');

    var errorsReturnedFromJaySchema = [{ keyword: 'maxItems',
  dataPath: '.documents',
  schemaPath: '#/properties/documents/maxItems',
  params: { limit: 2 },
  message: 'should NOT have more than 2 items' }
{ keyword: 'maxLength',
  dataPath: '.metadata.lastModifiedAt',
  schemaPath: '#/properties/metadata/properties/lastModifiedAt/maxLength',
  params: { limit: 2 },
  message: 'should NOT be longer than 2 characters' }
{ keyword: 'format',
  dataPath: '.metadata.lastModifiedAt',
  schemaPath: '#/properties/metadata/properties/lastModifiedAt/format',
  params: { format: 'date-time' },
  message: 'should match format "date-time"' }];

    var normalisedErrors = normalise(errorsReturnedFromJaySchema);

    console.log(normalisedErrors);

results in

    {
                "fields": {
                    "floorNumber": [
                        "Additional property not allowed"
                    ],
                    "developerId": [
                        "Is required"
                    ],
                    "userId": [
                        "Must be shorter than 2 characters"
                    ],
                    "title": [
                        "Is required"
                    ],
                    "documents": [
                        "Must have no more than 2 items"
                    ],
                    "metadata.lastModifiedAt": [
                        "Must be shorter than 2 characters",
                        "Should be a date"
                    ]
                }
            }
