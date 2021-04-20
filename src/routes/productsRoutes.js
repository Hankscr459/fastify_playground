import { 
  getProducts,
  getFilterProducts
} from '../controller/product.js'

import {
  getProductsSchema,
  getFilterProductsSchema
} from '../schema/products.js'

const routes = async (fastify, opts) => {
  fastify.get('/getProducts', { schema: getProductsSchema }, getProducts)
  fastify.post('/getFilterProducts', { schema: getFilterProductsSchema }, getFilterProducts)
}
  
export default  routes 