const fastify = require('fastify')  
const dotenv = require('dotenv') 
const cors = require('fastify-cors') 
const usersRoutes = require('./routes/usersRoutes') 

dotenv.config()


const app = fastify({ logger: true })

app.register(cors)
app.register(usersRoutes, { prefix: 'api/users' })

//@Routes
// app.get('/', async (request, reply) => {
//     reply.send({message: 'hello'})
// })

// app.get('/bye', async (request, reply) => {
//     reply.send({message: 'goobye'})
// })


const POST = process.env.PORT || 5000

app.listen(POST, () => {console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)})