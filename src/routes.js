const router = require('express').Router();

const UserController = require('./app/controllers/UserController');
const UserValidator = require('./app/request/UserValidator');
const PostController = require('./app/controllers/PostController');
const MessageController = require('./app/controllers/MessageController');
const NotificationController = require('./app/controllers/NotificationController');
const auth = require('./app/middlewares/auth');

const PostValidator = require('./app/request/PostValidator');
const MessageValidator = require('./app/request/MessageValidator');
const NotificationValidator = require('./app/request/NotificationValidator');

router.get('/api/users', UserController.index);
router.post('/api/register', UserValidator.store, UserController.store);
router.post('/api/login', UserController.startSession);
router.put(`/api/user/:id`, auth.isAuthenticated, UserController.update);
router.get('/api/auth_user', UserController.getAuthUser);
router.post('/api/change_password/:id', auth.isAuthenticated, UserController.changePassword);

router.get('/api/posts', PostController.index);
router.post('/api/posts', auth.isAuthenticated, PostValidator.store, PostController.store);
router.put('/api/posts/:id', auth.isAuthenticated, PostValidator.update, PostController.update);
router.delete('/api/posts/:id', auth.isAuthenticated, PostController.destroy);
router.get('/api/canditado_posts/:id', PostController.getCandidatos);
router.post('/api/candidato_posts', PostValidator.addCandidatos, PostController.addCandidatos);

router.get('/api/messages', MessageController.index);
router.get('/api/message_of_user/:id', auth.isAuthenticated, MessageValidator.messageOfUser, MessageController.messageOfUser);
router.post('/api/messages', auth.isAuthenticated, MessageValidator.store, MessageController.store);
router.put('/api/messages/:id', auth.isAuthenticated, MessageValidator.update, MessageController.update);
router.delete('/api/messages/:id', auth.isAuthenticated, MessageValidator.destroy, MessageController.destroy);

router.get('/api/notifications', NotificationController.index);
router.get('/api/notifications_to_user/:id', auth.isAuthenticated, NotificationValidator.notificationToUser, NotificationController.notificationToUser);

module.exports = router;