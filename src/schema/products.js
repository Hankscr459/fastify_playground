const getProductsSchema = {
    response: {
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
}

export {
    getProductsSchema
}