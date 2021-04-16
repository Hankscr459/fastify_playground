const { Hello, testMiddle } = require('../controller/user')

const mid = {
    beforeHandler: function (request, reply, done) {
     
      console.log('This is a test middleware.');
      done()
    }
  };

const routes  = async (fastify, opts) => {

    fastify.get('/', mid, Hello)
}

module.exports = routes