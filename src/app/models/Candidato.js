const mongoose = require('../../database/index');
const Schema = mongoose.Schema;

const CandidatoSchema = new Schema({
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Candidato = mongoose.model('Candidato', CandidatoSchema);

module.exports = Candidato;
