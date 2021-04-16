const { Hello } = require('../controller/user')

const { 
  midd1,
  midd2
} = require('../middleware/helper')

const routes  = async (fastify, opts) => {

  fastify.get('/', {preHandler: [midd1, midd2]}, Hello)
    
}

module.exports = routes