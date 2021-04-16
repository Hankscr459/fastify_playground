const User = require('../models/user')

const Hello = async (req, res) => {
    res.code(201).send({ message:'Hello world' })
}

const getAllUser = async (req, res) => {
    // Try to use aggregate
    const result = await User.aggregate([{ "$project": { "name": 1, "role": 1 } }]).exec((err, user) => {
        res.code(201).send(user)
    })

    // const result = await User.find()
    // res.code(201).send(user)
    
}


const filterPoint = async (req, res) => {
    // Try to use aggregate
    const result = await User.aggregate([{ "$match": { bonusPoint: { "$gte": 500 }} }]).exec((err, user) => {
        res.code(201).send(user)
    })
    
}


module.exports = {
    Hello,
    getAllUser,
    filterPoint
}