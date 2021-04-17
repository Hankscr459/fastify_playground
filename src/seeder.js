import dotenv from'dotenv'
import users from'./data/users'
import User from'./models/user'
import connectDB from'./config/db.js'

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