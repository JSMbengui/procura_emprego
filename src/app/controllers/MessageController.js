const Message = require('../models/Message');

class MessageController {
    async index(req, res) {
        try {
            const { page = 1, limit = 16 } = req.query;
            let messages = await Message.find().limit(limit * 1).skip((page - 1) * limit).exec();

            const count = await Message.countDocuments();
            return res.status(200).json({
                messages,
                totalPages: Math.ceil(count / limit),
                totalMessages: count,
                currentPage: page
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async messageOfUser(req, res) {
        try {
            const { page = 1, limit = 16 } = req.query;
            let messages = await Message.find({ from: req.params.id }).limit(limit * 1).skip((page - 1) * limit).exec();

            const count = await Message.countDocuments();
            return res.status(200).json({
                messages,
                totalPages: Math.ceil(count / limit),
                totalMessages: count,
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
            const message = await Message.create(req.body);

            return res.status(201).json(message);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async update(req, res) {
        try {

            await Message.updateOne({ _id: req.params.id }, { body: req.body.body });

            return res.status(200).json(req.body);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async destroy(req, res) {
        try {
            await Message.deleteOne({ _id: req.params.id });

            return res.status(200).json({});
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
}

module.exports = new MessageController();