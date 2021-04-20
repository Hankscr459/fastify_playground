import { 
    upload
} from '../controller/photo.js'

const routes = async (fastify, opts) => {

    // multer upload photo
    fastify.post('/uploads', { preHandler: upload.single('photos') }, (req, res) => res.code(200).send(req.file))
}
    
export default  routes 