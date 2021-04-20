import jwt from 'jsonwebtoken'

const generateToken = ({_id, name, role}) => {
    return jwt.sign({ _id, name, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export default generateToken