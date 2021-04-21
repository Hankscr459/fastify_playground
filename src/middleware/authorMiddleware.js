import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const protect =  async (req, res, next) => {
    let token
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // console.log( 'decode: ', decoded.role)

            req.user = await User.findById(decoded._id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.code(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.code(401)
        throw new Error('Not authorized, no token')
    }
}

const admin = (req, res, next) => {
    if(req.user && req.user.role == 'Admin') {
        next()
    } else {
        res.code(401)
        throw new Error('Not authorized as an admin')
    }
}


export { protect, admin }