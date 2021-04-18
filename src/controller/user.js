import User from '../models/userModel.js'

const Hello = async (req, res) => {
    res.code(201).send({ message:'Hello world' })
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
    getAllUser,
    filterPoint
}