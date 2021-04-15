
const Hello = async (reply) => {
    // res.status(200).send({message: 'Hello world'})
    console.log('Hello')
    reply.send({status:"200",message:'Hello world'})
}

module.exports = {
    Hello
}