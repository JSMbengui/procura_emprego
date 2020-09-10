const mongoose = require('../../database/index');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Este campo tem de ser preenchido.']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Este campo tem de ser preenchido.']
    },
    genero: {
        type: String,
        required: [true, 'Este campo tem de ser preenchido.']
    },
    birthDay: {
        type: String,
        required: [true, 'Este campo tem de ser preenchido.']
    },
    password: {
        type: String,
        select: false,
        required: [true, 'Este campo tem de ser preenchido.']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    
    this.password = hash;
    
    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
