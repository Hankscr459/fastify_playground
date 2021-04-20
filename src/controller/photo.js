import multer from 'fastify-multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      await cb(null, 'src/uploads/')
    },
    filename: async (req, file, cb) => {
      await cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const uploadFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)

    if (ext == '.jpg' || ext == '.png' || ext == '.jepg') {
        cb(null, true)
    }
    cb(null,  false)
    
}

const upload = multer({ storage: storage, fileFilter: uploadFilter })


export {
    upload
}

// const fileFilter = (req, file, cb) => {
//     const ext = path.extname(file.originalname)
//     console.log(typeof ext)
//     if (ext !== '.jpg' || ext !== '.png' || ext !== '.jepg') {
//         return cb(new Error('only jpg, png are allowed'), false)
//     }
//     cb(null, true)
// }