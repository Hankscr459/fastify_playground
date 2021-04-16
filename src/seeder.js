const dotenv = require('dotenv')
const users = require('./data/users')
const User = require('./models/user')
const { connectDB } = require('./config/db.js')

dotenv.config()

connectDB()

const importData = async () => {
    try {

        await User.insertMany(users)

        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destoryData = async () => {
    try {
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