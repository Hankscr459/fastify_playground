import fastify from 'fastify'
import dotenv from 'dotenv'
import cors from 'fastify-cors'
import { connectDB } from './config/db.js'
import usersRoutes from './routes/usersRoutes.js'


dotenv.config()
connectDB()

const app = fastify({ logger: true })

app.register(cors)
app.register(import('middie'))
app.register(usersRoutes, { prefix: 'api/users' })



const POST = process.env.PORT || 5000

app.listen(POST, () => {console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)})