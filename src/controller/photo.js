import multer from 'fastify-multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

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