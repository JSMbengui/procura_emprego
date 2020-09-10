const Post = require('../models/Post');
const Candidato = require('../models/Candidato');

class PostController {
    async index(req, res) {
        try {
            const { page = 1, limit = 16, search_name = '' } = req.query;
            let posts = await Post.find().limit(limit * 1).skip((page - 1) * limit).exec();

            const count = await Post.countDocuments();
            return res.status(200).json({
                posts,
                totalPages: Math.ceil(count / limit),
                totalPosts: count,
                currentPage: page
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async store(req, res) {
        try {
            const post = await Post.create({
                body: req.body.body,
                user: req.body.user,
                location: {
                    type: 'Point',
                    coordinates: [req.body.latitude, req.body.longitude]
                }
            });

            return res.status(201).json(post);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async update(req, res) {
        try {
            let currentPost = await Post.findById(req.params.id);

            let postToUpdate = {
                body: currentPost.body,
                location: currentPost.location,
                user: currentPost.user
            };

            if (req.body.body) postToUpdate.body = req.body.body;
            else if (req.body.latitude) postToUpdate.location.latitude = req.body.latitude;
            else if (req.body.longitude) postToUpdate.location.longitude = req.body.longitude;
            
            await Post.updateOne({ _id: req.params.id }, postToUpdate);

            return res.status(200).json(req.body);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async destroy(req, res) {
        try {
            await Post.deleteOne({ _id: req.params.id });

            return res.status(200).json({});
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async getCandidatos(req, res) {
        try {
            const post_candidatos = await Candidato.find({ post: req.params.id });
            return res.json({
                candidatos_inscritos: post_candidatos
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async addCandidatos(req, res) {
        try {
            const post_candidato = await Candidato.create(req.body);

            return res.status(201).json(post_candidato);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
}

module.exports = new PostController();