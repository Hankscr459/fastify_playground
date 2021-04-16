const { Hello } = require('../controller/user')


const routes  = async (fastify, opts) => {

  fastify.use(function (req, res, next) {
    console.log({message: 'My first middleware.'})
    next();
  })

  fastify.get('/', Hello)
    
}

module.exports = routes