const Message = require('../models/Message');
const User = require('../models/User');

class MessageValidator {
    async store(req, res, next) {
        const { body, from, to } = req.body;
        if (from !== req.userId) {
            return res.status(400).json({
                message: 'Id do rementente invalido.'
            })
        }
        if (!body) {
            return res.status(400).json({
                message: 'Tens de inserir o conteúdo da messagem'
            })
        }
        if (!from) {
            return res.status(400).json({
                message: 'Tens de informar id do remetente.'
            })
        }
        if (!to) {
            return res.status(400).json({
                message: 'Tens de informar id do destinatario.'
            })
        }
        const remetente = await User.findById(from);
        if (!remetente) {
            return res.status(400).json({
                message: 'Remetente não encontrado'
            })
        }
        const destinatario = await User.findById(to);
        if (!destinatario) {
            return res.status(400).json({
                message: 'Destinatario não encontrado'
            })
        }
        next();
    }
    async update(req, res, next) {
        let currentMessage = await Message.findById(req.params.id);

        if (!currentMessage) {
            return res.status(404).json({
                message: 'Publicação não encontrada.'
            })
        }
        if (currentMessage.from != req.userId) {
            console.log(currentMessage.from)
            console.log(req.userId)
            return res.status(400).json({
                message: 'Não tens autorização para alterar esta mensagem.'
            })
        }
        const { body } = req.body;

        if (!body) {
            return res.status(400).json({
                message: 'Tens de inserir o conteúdo da messagem'
            })
        }
        if (body === currentMessage.body) {
            return res.status(200).json({
                message: 'Atualizada com sucesso!'
            })
        }
        next();
    }
    async destroy(req, res, next) {
        let currentMessage = await Message.findById(req.params.id);

        if (!currentMessage) {
            return res.status(404).json({
                message: 'Publicação não encontrada.'
            })
        }
        if (currentMessage.from != req.userId) {
            return res.status(400).json({
                message: 'Não tens autorização para eliminar esta mensagem.'
            })
        }
        next();
    }    
    async messageOfUser(req, res, next) {
        if (req.params.id != req.userId) {
            return res.status(400).json({
                message: 'Não tens autorização para ver mensagens.'
            })
        }
        next();
    }
}

module.exports = new MessageValidator();