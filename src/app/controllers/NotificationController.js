const Notification = require('../models/Notification');

class NotificationController {
    async index(req, res) {
        try {
            const { page = 1, limit = 16 } = req.query;
            let notifications =  await Notification.find().limit(limit * 1).skip((page - 1) * limit).exec();;
            
            const count = await Message.countDocuments();
            return res.status(200).json({
                notifications,
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
    async notificationToUser(req, res) {
        try {
            const { page = 1, limit = 16 } = req.query;
            let notifications = await Notification.find({ to: req.params.id }).limit(limit * 1).skip((page - 1) * limit).exec();

            const count = await Notification.countDocuments();
            return res.status(200).json({
                notifications,
                totalPages: Math.ceil(count / limit),
                totalNotifications: count,
                currentPage: page
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
}

module.exports = new NotificationController();