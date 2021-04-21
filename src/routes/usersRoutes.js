import { 
  Hello,
  authUser,
  registerUser,
  secret,
  getAllUser,
  forgotPassword,
  resetPassword,
  filterPoint,
  email
} from '../controller/user.js'

import { HelloSchema } from '../schema/users.js'

import { 
  midd1,
  midd2
} from '../middleware/helper.js'

import { protect } from '../middleware/authorMiddleware.js'

const routes = async (fastify, opts) => {
  fastify.get('/',  (req, res) => res.send({ message: 'This is a user page' }))
  fastify.get('/hello', { schema: HelloSchema, preHandler: [midd1, midd2]}, Hello)
  fastify.get('/all', getAllUser)
  fastify.post('/signup', registerUser)
  fastify.post('/signin', authUser)
  fastify.get('/secret',  { preHandler: [protect]}, secret)
  fastify.get('/point', filterPoint)
  fastify.put('/forgot-password', forgotPassword)
  fastify.put("/reset-password", resetPassword)
  fastify.get("/email", email)
}

export default  routes