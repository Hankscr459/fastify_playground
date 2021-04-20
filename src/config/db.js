import mongoose from 'mongoose'
import('../models/userModel.js')
import('../models/categoryModel.js')
import('../models/productModel.js')
import('../models/photoModel.js')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB Connect: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export {
    connectDB
}