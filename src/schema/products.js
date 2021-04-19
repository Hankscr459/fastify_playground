const productsResponse = {

    201: {
    type: 'object',
    properties: {
            products: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        rating: { type: 'number' },
                        numReviews: { type: 'number' },
                        price: { type: 'number' },
                        countInStock: { type: 'number' },
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        image: { type: 'string' },
                        brand: { type: 'string' },
                        reviews: { type: ['object', 'null', 'array'] },
                        user: { type: 'string' },
                        category: {
                            _id: { type: 'string' },
                            name: { type: 'string' }
                        },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' }
                    }
                }
                
            },
            currentPage: { type: 'number' },
            totalPages: { type: 'number' },
            next: { type: 'boolean' },
            prev: { type: 'boolean' },
            pages: { type: 'array' }
        }
    }
    
}

const productsQuerystring = {

    type: 'object',
    properties: {
        pageNumber: { type: 'number' },
        sortBy: { type: 'string' }
    }

}

const getProductsSchema = {

    querystring: productsQuerystring,
    response: productsResponse

}

const getFilterProductsSchema = {

    body: {
      // additionalProperties: false, // it will remove all the field that is NOT in the JSON schema
    //   required: [
    //   ],
      type: 'object',
      properties: {
        filters: {
            type: 'object',
            properties: {
                category: { type: 'array' },
                price: { type: 'array' }
            }
        }
      }
    },
    querystring: productsQuerystring,
    response: productsResponse

}

export {
    getProductsSchema,
    getFilterProductsSchema
}