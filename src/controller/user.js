const User = require('../models/user')

const Hello = async (req, res) => {
    res.code(201).send({ message:'Hello world' })
}

const getAllUser = async (req, res) => {
    // Try to use aggrrgate
    const result = await User.aggregate([{ "$project": { "_id": 0 } }]).exec((err, user) =>{
        res.code(201).send(user)
    })

    // const result = await User.find()
    // res.code(201).send(user)
    
}

module.exports = {
    Hello,
    getAllUser
}