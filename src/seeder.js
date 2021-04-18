import dotenv from'dotenv'
import categories from './data/categories.js'
import products from './data/products.js'
import users from'./data/users.js'
import User from'./models/userModel.js'
import Category from './models/categoryModel.js'
import Product from './models/productModel.js'
import { connectDB } from'./config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {

        await Category.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const createdCategories = await Category.insertMany(categories)
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser, category: createdCategories[Math.floor(Math.random() * 2)]._id }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destoryData = async () => {
    try {
        
        await Category.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destoryed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destoryData()
} else {
    importData()
}