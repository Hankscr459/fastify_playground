import Product from '../models/productModel.js'

const getProducts = async (req, res) => {
    
    await Product.find()
        .populate('category')
        .exec((err, product) => {
            try {
                res.code(201).send(product)
            } catch (err) {
                res.code(404).send(err)
            }
        })
    
}

export {
    getProducts
}