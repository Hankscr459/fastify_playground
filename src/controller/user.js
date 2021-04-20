import User from '../models/userModel.js'
import  generateToken  from '../utlis/generateToken.js'

const Hello = async (req, res) => {
    res.code(201).send({ message:'Hello world' })
}

const authUser = async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        res.code(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken({_id: user._id, name: user.name, role: user.role})
        })
    } else {
        res.code(401)
        throw new Error('Invalid email or password')
    }
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    
    const userExists = await User.findOne({ name })

    if(userExists) {
        res.code(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.code(201).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken({_id: user._id, name: user.name, role: user.role})
        })
    } else {
        res.code(400)
        throw new Error('Invalid user data')
    }
}

const getAllUser = async (req, res) => {
    // Try to use aggregate
    const result = await User.aggregate([{ "$project": { "name": 1, "role": 1 } }]).exec((err, user) => {
        try {
            res.code(201).send(user)
        } catch (err) {
            res.code(404).send(err)
        }
    })

    // const result = await User.find()
    // res.code(201).send(user)
    
}

const secret = async (req, res) => {
    res.code(201).send({message: 'Success to access secret page!'})
}

const filterPoint = async (req, res) => {

    const result = await User.aggregate([
        { "$project": {
                "hsitory": {
                    "$filter": {
                        "input": "$history",
                        "as": "history",
                        "cond": { "$gte": [ "$$history.totalprice", 1000 ] }
                    }
                }
            } 
        }
    ]).exec((err, user) => {
        try {
            res.code(201).send(user)
        } catch (err) {
            res.code(404).send(err)
        }
    })
}


export  {
    Hello,
    registerUser,
    authUser,
    secret,
    getAllUser,
    filterPoint
}



// const filterPoint = async (req, res) => {
//     // Try to use aggregate
//     const result = await User.aggregate([
//         { "$match": { bonusPoint: { "$gte": 500 }} },
//         { "$project": { password: false } }
//     ]).exec((err, user) => {
//         try {
//             res.code(201).send(user)
//         } catch (err) {
//             res.code(404).send(err)
//         }
//     })
// }

// const filterPoint = async (req, res) => {

//     const result = await User.aggregate([
//         { "$match": { bonusPoint: { "$gte": 500 }} },   // bonuspoint must be at least 500 
//         { "$group": {
//              "_id": "$keyboard",
//              "average": { "$avg": "$bonusPoint" }, // average bonuspoint
//              "sum": { "$sum": "$bonusPoint" }   // sum
//             } 
//         }
//     ]).exec((err, user) => {
//         try {
//             res.code(201).send(user)
//         } catch (err) {
//             res.code(404).send(err)
//         }
//     })
// }

// const filterPoint = async (req, res) => {

//     const result = await User.aggregate([
//         { "$match": { name: "Admin User" } },
//         { "$project": {
//              "name": 1,
//              "sum": { "$sum": "$history.totalprice" },
//              "average": { "$avg": "$history.totalprice" }
//             } 
//         },
//         { "$project": {
//                 "name": 1,
//                 "sum": 1,
//                 "average": 1,
//                 "Balance": { $subtract: ["$sum","$average"] },
//             } 
//         },
//     ]).exec((err, user) => {
//         try {
//             res.code(201).send(user)
//         } catch (err) {
//             res.code(404).send(err)
//         }
//     })
// }

// const filterPoint = async (req, res) => {

//     const result = await User.find(
//         { "$expr": { $gt: [ "$assets", "$bonusPoint" ] } }
//     ).exec((err, user) => {
//         try {
//             res.code(201).send(user)
//         } catch (err) {
//             res.code(404).send(err)
//         }
//     })
// }

// const filterPoint = async (req, res) => {

//     const result = await User.aggregate([
//         { "$match": { name: "Admin User" } },
//         { "$project": {
//              "name": 1,
//              "sum": { "$sum": "$history.totalprice" },
//              "average": { "$avg": "$history.totalprice" }
//             } 
//         },
//         { "$project": {
//                 "name": 1,
//                 "sum": 1,
//                 "average": 1,
//                 total: { $multiply: [ "$sum", "$average" ] }
//             } 
//         },
//     ]).exec((err, user) => {
//         try {
//             res.code(201).send(user)
//         } catch (err) {
//             res.code(404).send(err)
//         }
//     })
// }