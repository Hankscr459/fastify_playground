import { 
  getProducts,
  getProductById,
  getFilterProducts,
  getProductsWithAggregate,
  ProductsWithAggregateLookup,
  listRelated
} from '../controller/product.js'

import {
  getProductsSchema,
  getFilterProductsSchema
} from '../schema/products.js'

const routes = async (fastify, opts) => {
  fastify.get('/getProducts', { schema: getProductsSchema }, getProducts)
  fastify.post('/getFilterProducts', { schema: getFilterProductsSchema }, getFilterProducts)
  fastify.get('/getProductsWithaggregate', getProductsWithAggregate)
  fastify.get('/ProductsWithAggregateLookup', ProductsWithAggregateLookup)
  fastify.post('/listRelated', listRelated)
  fastify.get('/:id', getProductById)
}
  
export default  routes 