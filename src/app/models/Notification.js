const mongoose = require('../../database/index');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    body: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Este campo tem de ser preenchido.']
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Este campo tem de ser preenchido.'],
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
