const Hello = async (req, res) => {
    
    res.send({ message:'Hello world' })
}

const testMiddle = async (req, res, next) => {

    console.log('This is a test middleware.')
    next()
}

module.exports = {
    Hello,
    testMiddle
}