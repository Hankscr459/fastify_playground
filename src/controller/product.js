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


// const getProducts = async (req, res) => {
//     const pageSize = 4
//     let page = Number(req.query.pageNumber) || 1

//     const keyboard = req.query.keyboard
//     ? {
//         name: {
//             $regex: req.query.keyboard,
//             $options: 'i'
//         }
//     } : {}

//     const count = await Product.countDocuments({...keyboard})
//     const pages = Math.ceil(count / pageSize)

//     page = (page > pages) ? pages : page

//     const products = await Product.find({...keyboard})
//         .populate('category', 'name _id')
//         .limit(pageSize)
//         .skip(pageSize * (page -1))

//     res.code(201).send({products, page, pages })
    
// }

const getProducts = async (req, res) => {
    const pageSize = 10
    let currentPage = Number(req.query.pageNumber) || 1
    let next = false
    let prev = false

    const keyboard = req.query.keyboard
    ? {
        name: {
            $regex: req.query.keyboard,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keyboard})
    const totalPages = Math.ceil(count / pageSize)

    currentPage = (currentPage > totalPages) ? totalPages : currentPage
    next = (currentPage < totalPages) ? true : false
    prev = (currentPage > 1) ? true : false

    const products = await Product.find({...keyboard})
        .select('-description')
        .populate('category', 'name _id')
        .limit(pageSize)
        .skip(pageSize * (currentPage -1))

    let pageStart = (currentPage > 3) ? currentPage - 3  : 1
    let pageEnd = (currentPage < (totalPages - 3)) ? currentPage + 3 : totalPages + 1

    const pages = Array(pageEnd - pageStart).fill().map((_, idx) => pageStart + idx)

    res.code(201).send({products, currentPage, totalPages, next, prev, pages })
    
}


export {
    getProducts
}