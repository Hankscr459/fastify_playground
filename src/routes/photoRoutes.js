import { 
    upload
} from '../controller/photo.js'

const routes = async (fastify, opts) => {

    // multer upload photo
    fastify.post('/uploads', { preHandler: upload.array('photos', 12) }, (req, res) => res.code(200).send(req.files))
}
    
export default  routes 