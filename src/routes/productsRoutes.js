import { 
  getProducts,
  getFilterProducts
} from '../controller/product.js'

const routes = async (fastify, opts) => {
  fastify.get('/getProducts', getProducts)
  fastify.post('/getProducts', getFilterProducts)
}
  
  export default  routes 