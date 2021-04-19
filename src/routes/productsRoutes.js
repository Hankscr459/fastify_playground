import { 
  getProducts,
  getFilterProducts
} from '../controller/product.js'

import {
  getProductsSchema
} from '../schema/products.js'

const routes = async (fastify, opts) => {
  fastify.get('/getProducts', { schema: getProductsSchema }, getProducts)
  fastify.post('/getFilterProducts', getFilterProducts)
}
  
  export default  routes 