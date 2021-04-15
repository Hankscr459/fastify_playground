// const { Hello } = require('../controller/user')

const routes  = async (fastify, options) => {
    fastify.get('/', function (reply) {
        reply.send({ message: 'Hello' })
    })
}

module.exports = routes