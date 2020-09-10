const Post = require('../models/Post');

class PostValidator {
    async store(req, res, next) {
        const { body, latitude, longitude, user } = req.body;

        if(!body) {
            return res.status(400).json({
                message: 'Tens de inserir o conteúdo da publicação'
            })
        }
        if(!latitude) {
            return res.status(400).json({
                message: 'Tens de informar a latitude da tua localização.'
            })
        }
        if(!longitude) {
            return res.status(400).json({
                message: 'Tens de informar a longitude da tua localização.'
            })
        }
        if(!user) {
            return res.status(400).json({
                message: 'Tens de informar o teu id'
            })
        }
        
        next();
    }
    async update(req, res, next) {
        let currentPost = await Post.findById(req.params.id);
        
        if (!currentPost) {
            return res.status(404).json({
                message: 'Publicação não encontrada.'
            })
        }
        next(); 
    }
    async addCandidatos(req, res, next) {
        const { post, user } = req.body;

        if(!post) {
            return res.status(400).json({
                message: 'Tens de informar o id do post'
            })
        }
        if(!user) {
            return res.status(400).json({
                message: 'Tens de informar o id do usuario'
            })
        }
        
        next();
    }
}

module.exports = new PostValidator();