const { 
  Hello,
  getAllUser
} = require('../controller/user')

const { HelloSchema } = require('../schema/users')

const { 
  midd1,
  midd2
} = require('../middleware/helper')

const routes  = async (fastify, opts) => {
  fastify.get('/', { schema: HelloSchema, preHandler: [midd1, midd2]}, Hello)
  fastify.get('/all', getAllUser)
}

module.exports = routes