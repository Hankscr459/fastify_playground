import { 
  Hello,
  authUser,
  registerUser,
  secret,
  getAllUser,
  filterPoint
} from '../controller/user.js'

import { HelloSchema } from '../schema/users.js'

import { 
  midd1,
  midd2
} from '../middleware/helper.js'

import { protect } from '../middleware/authorMiddleware.js'

const routes   = async (fastify, opts) => {
  fastify.get('/', { schema: HelloSchema, preHandler: [midd1, midd2]}, Hello)
  fastify.get('/all', getAllUser)
  fastify.post('/signup', registerUser)
  fastify.post('/signin', authUser)
  fastify.get('/secret',  { preHandler: [protect]}, secret)
  fastify.get('/point', filterPoint)
}

export default  routes