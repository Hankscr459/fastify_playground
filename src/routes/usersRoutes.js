import { 
  Hello,
  getAllUser,
  filterPoint
} from '../controller/user.js'

import { HelloSchema } from '../schema/users.js'

import { 
  midd1,
  midd2
} from '../middleware/helper.js'

const usersRoutes   = async (fastify, opts) => {
  fastify.get('/', { schema: HelloSchema, preHandler: [midd1, midd2]}, Hello)
  fastify.get('/all', getAllUser)
  fastify.get('/point', filterPoint)
}

export default  usersRoutes 