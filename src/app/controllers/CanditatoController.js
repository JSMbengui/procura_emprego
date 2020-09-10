const Candidato = require('../models/Candidato');

class CandidatoController {
    async index(req, res) {
        try {
            const { page = 1, limit = 8, search_name = '' } = req.query;
            let candidatos = [];

            if (search_name !== '') {
                candidatos = await Candidato.find({ name: { $regex: '.*' + search_name + '.*', $options: 'i' } }).limit(limit * 1).skip((page - 1) * limit).exec();
            }
            else {
                candidatos = await Candidato.find().limit(limit * 1).skip((page - 1) * limit).exec();
            }

            const count = await Candidato.countDocuments();
            return res.status(200).json({
                candidatos,
                totalPages: Math.ceil(count / limit),
                totalCandidatos: count,
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
            const candidato = await Candidato.create(req.body);

            return res.status(201).json(candidato);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async update(req, res) {
        try {
            await Candidato.updateOne({ _id: req.params.id }, req.body);

            return res.status(200).json(req.body);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async destroy(req, res) {
        try {
            await Candidato.deleteOne({ _id: req.params.id });

            return res.status(200).json({});
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
}

module.exports = new CandidatoController();