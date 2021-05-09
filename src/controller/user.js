import User from '../models/userModel.js'
import generateToken from '../utlis/generateToken.js'
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import sgMail from '@sendgrid/mail'
sgMail.setApiKey('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')

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
    { 
      $project: {
        history: 1,
        "total": {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: "$history",
                    as: "s",
                    cond: { $gte: [ "$$s.totalprice", 1000 ] }
                  },
                },
                as: 'el',
                in: '$$el.totalprice'
              }
            }
        },
      },
    },
    { 
      $group: {
        _id: "$keyboard",
        totalPrice: { $sum: "$total" }   // sum
      } 
    },
  ]).exec((err, user) => {
      try {
          res.code(201).send(user[0])
      } catch (err) {
          res.code(404).send(err)
      }
  })
}

// const filterPoint = async (req, res) => {

//     const result = await User.aggregate([
//         { "$project": {
//                 "hsitory": {
//                     "$filter": {
//                         "input": "$history",
//                         "as": "history",
//                         "cond": { "$gte": [ "$$history.totalprice", 1000 ] }
//                     }
//                 }
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

const forgotPassword = async (req, res) => {
        const { email } = req.body
            await User.findOne({email}, async (err, user) => {
                try {
                    const token = generateToken({_id: user._id, name: user.name, role: user.role})
                    console.log('user info: ', user)
                    
                    // email
                    const emailData = {
                        from: process.env.EMAIL_FROM,
                        to: email,
                        subject: `Password reset link`,
                        html: `
                            <h4>Please use the following</h4>
                            <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                            <hr />
                            <p>This email may contain sensetive information</p>
                            <p>https://fastify-playground.com</p>
                        `
                    }

                    console.log(emailData)

                    // poplating the db > user > resetPasswordLink
                    await user.updateOne({resetPasswordLink: token}, async (err, success) => {
                            try {
                                
                                await sgMail.send(emailData).then(sent => {
                                    console.log( 'test success: ', sent)
                                    return res.send({
                                        message: `Email has been sent to ${email}. Follow the instructions to reset your password. Link expires in 10min`
                                    })
                                })

                            } catch (error) {
                                res.send(err)
                            }
                    })
                } catch (err) {
                    res.send(err)
                }
        })
}

const resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body
    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.code(401).send({
                    error: 'Expired link. Try again'
                })
            }
            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.code(401).send({
                        error: 'Something went wrong. Try later'
                    })
                }
                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                }
                user = _.extend(user, updatedFields)
                user.save((err, result) => {
                    if (err) {
                        return res.code(400).send({
                            error: err
                        })
                    }
                    res.send({
                        message: `Great! Now you can login with your new password`
                    })
                })
            })
        })
    }
}

const email = async (req, res) => {
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: 'akysn564@gmail.com',
            subject: `Password reset link`,
            html: `
                <h4>Please use the following</h4>
                <p>${process.env.CLIENT_URL}/auth/password/reset/</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>https://fastify-playground.com</p>
            `
        }
            await sgMail
                .send(emailData)
                .then( async (err, success) => {
                    try {
                        console.log('Email sent', success)
                        return res.code(400).send({message: 'success'})
                    } catch (err) {
                        console.log('error: ', err)
                    }
                })
                .catch((error) => {
                    console.error( 'error: ', error)
                })
}

export  {
    Hello,
    registerUser,
    authUser,
    secret,
    getAllUser,
    filterPoint,
    forgotPassword,
    resetPassword,
    email
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
//       {
//         $project: {
//           history: 1,
//           "price": {
//             $sum: {
//               $map: {
//                 input: "$history",
//                 as: 'el',
//                 in: '$$el.totalprice'
//               }
//             }//216070
//           }  
//         }
//       },
//       { 
//         $group: {
//           _id: "$keyboard",
//           totalPrice: { $sum: "$price" }
//         }
//       }
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