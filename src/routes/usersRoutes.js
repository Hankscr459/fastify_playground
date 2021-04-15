// const { Hello } = require('../controller/user')

const routes  = async (fastify, options) => {
    fastify.get('/', function (request, reply) {
        reply.send({ message: 'Hello' })
    })

    // fastify.get('/', Hello)
}

module.exports = routes