const HelloSchema = {
    // body: {
    //   type: 'object',
    //   // additionalProperties: false, // it will remove all the field that is NOT in the JSON schema
    //   required: [
    //     'message'
    //   ],
    //   properties: {
    //     message: { type: 'string' },
    //   }
    // },
    response: {
        201: {
        type: 'object',
        properties: {
                message: { type: 'string' }
            }
        }
    }
}

export {
    HelloSchema
}