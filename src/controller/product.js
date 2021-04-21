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

    const sort = req.query.sortBy ? req.query.sortBy : "priceOrderByasc"
    const parts = sort.split('OrderBy')

    const pageSize = 5
    let currentPage = Number(req.query.pageNumber) || 1

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

    let next = (currentPage < totalPages) ? true : false
    let prev = (currentPage > 1) ? true : false
    let pageStart = (currentPage > 3) ? currentPage - 3  : 1
    let pageEnd = (currentPage < (totalPages - 3)) ? currentPage + 3 : totalPages + 1

    const pages = Array(pageEnd - pageStart).fill().map((_, idx) => pageStart + idx)

    const products = await Product.find({...keyboard})
        .select('-description')
        .populate('category', 'name _id')
        .sort([[parts[0], parts[1]]])
        .limit(pageSize)
        .skip(pageSize * (currentPage -1))

    res.code(201).send({products, currentPage, totalPages, next, prev, pages })
    
}


const getFilterProducts = async (req, res) => {

    const sort = req.query.sortBy ? req.query.sortBy : "priceOrderByasc"
    const parts = sort.split('OrderBy')
    let findArgs = {}

    const pageSize = 5
    let currentPage = Number(req.query.pageNumber) || 1

    const keyboard = req.query.keyboard
    ? {
        name: {
            $regex: req.query.keyboard,
            $options: 'i'
        }
    } : {}

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    const count = await Product.countDocuments({...keyboard, ...findArgs})
    const totalPages = Math.ceil(count / pageSize)

    currentPage = (currentPage > totalPages) ? totalPages : currentPage

    let next = (currentPage < totalPages) ? true : false
    let prev = (currentPage > 1) ? true : false
    let pageStart = (currentPage > 3) ? currentPage - 3  : 1
    let pageEnd = (currentPage < (totalPages - 3)) ? currentPage + 3 : totalPages + 1

    const pages = Array(pageEnd - pageStart).fill().map((_, idx) => pageStart + idx)

    const products = await Product.find({...keyboard, ...findArgs})
        .select('-description')
        .populate('category', 'name _id')
        .sort([[parts[0], parts[1]]])
        .limit(pageSize)
        .skip(pageSize * (currentPage -1))

    res.code(201).send({products, currentPage, totalPages, next, prev, pages })
    
}

const getProductsWithAggregate = async (req, res) => {
    const pageSize = 3
    let currentPage = Number(req.query.pageNumber) || 1

    const keyboard = req.query.keyboard
    ? {
        name: {
            $regex: req.query.keyboard,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({...keyboard})
    const totalPages = Math.ceil(count / pageSize)

    const pipeline = []

    req.query.keyboard ? pipeline.push({ $match: { name: { $regex: `${req.query.keyboard}` } }},{ $skip: (currentPage - 1) * pageSize },{ $limit: pageSize }) :
    pipeline.push({ $skip: (currentPage - 1) * pageSize },{ $limit: pageSize }) 

    const products = await Product.aggregate(pipeline)

    if (products) {
        res.code(201).send({products, currentPage, totalPages, count})
    } else {
        res.code(400)
        throw new Error('Invalid user data')
    }

}

export {
    getProducts,
    getFilterProducts,
    getProductsWithAggregate
}