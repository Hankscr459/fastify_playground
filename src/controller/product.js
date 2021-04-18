import Product from '../models/productModel.js'

// const getProducts = async (req, res) => {
    
//     await Product.find()
//         .populate('category', 'name _id')
//         .exec((err, product) => {
//             try {
//                 res.code(201).send(product)
//             } catch (err) {
//                 res.code(404).send(err)
//             }
//         })
    
// }


const getProducts = async (req, res) => {
    const pageSize = 4
    let page = Number(req.query.pageNumber) || 1

    const keyboard = req.query.keyboard
    ? {
        name: {
            $regex: req.query.keyboard,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keyboard})
    const pages = Math.ceil(count / pageSize)

    page = (page > pages) ? pages : page

    const products = await Product.find({...keyboard})
        .populate('category', 'name _id')
        .limit(pageSize)
        .skip(pageSize * (page -1))

    res.code(201).send({products, page, pages })
    
}

export {
    getProducts
}