const midd1 = async (req, res, next) => {
    console.log({message: 'My first middleware.'})
} 

const midd2 = async (req, res, next) => {
  console.log({message: 'My second middleware.'})
}

module.exports = {
  midd1,
  midd2
}