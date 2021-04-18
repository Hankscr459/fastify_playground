import { getProducts } from '../controller/product.js'

const routes = async (fastify, opts) => {
    fastify.get('/getProducts', getProducts)
  }
  
  export default  routes 