const fastify = require('fastify')  
const dotenv = require('dotenv') 
const cors = require('fastify-cors') 
const { connectDB } = require('./config/db')
const usersRoutes = require('./routes/usersRoutes') 

dotenv.config()
connectDB()

const app = fastify({ logger: true })

app.register(cors)
app.register(require('middie'))
app.register(usersRoutes, { prefix: 'api/users' })


const POST = process.env.PORT || 5000

app.listen(POST, () => {console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)})