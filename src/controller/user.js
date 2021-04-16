const Hello = async (req, res) => {
    
    res.send({ message:'Hello world' })
}

module.exports = {
    Hello
}