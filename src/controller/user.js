const Hello = async (req, res) => {
    res.code(201).send({ message:'Hello world' })
}

module.exports = {
    Hello
}