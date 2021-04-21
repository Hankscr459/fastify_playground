import fastify from 'fastify'
import dotenv from 'dotenv'
import cors from 'fastify-cors'
import { connectDB } from './config/db.js'
import usersRoutes from './routes/usersRoutes.js'
import productsRoutes from './routes/productsRoutes.js'
import photoRoutes from './routes/photoRoutes.js'
import multer from 'fastify-multer'
import fastifyStatic from 'fastify-static'
import path from 'path'


dotenv.config()
connectDB()

const app = fastify({ logger: true })

app.register(cors)

const __dirname = path.resolve()
app.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads')
})

app.register(multer.contentParser)
app.register(import('middie'))
app.register(usersRoutes, { prefix: 'api/users' })
app.register(productsRoutes, { prefix: 'api/products' })
app.register(photoRoutes, { prefix: 'api/photos' })


const POST = process.env.PORT || 5000

app.listen(POST, () => {console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`)})