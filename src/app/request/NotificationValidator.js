class NotificationValidator {  
    async notificationToUser(req, res, next) {
        if (req.params.id != req.userId) {
            return res.status(400).json({
                message: 'Não tens autorização para ver estas notificações.'
            })
        }
        next();
    }
}

module.exports = new NotificationValidator();