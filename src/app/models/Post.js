const mongoose = require('../../database/index');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    body: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Este campo tem de ser preenchido.']
    },
    location: {
        type: Object,
        required: [true, 'Este campo tem de ser preenchido.']
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
