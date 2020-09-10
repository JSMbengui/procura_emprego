const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

class UserController {
    async index(req, res) {
        try {
            const { page = 1, limit = 16, search_name = '' } = req.query;
            let users = [];

            if (search_name !== '') {
                users = await User.find({ name: { $regex: '.*' + search_name + '.*', $options: 'i' } }).limit(limit * 1).skip((page - 1) * limit).exec();
            }
            else {
                users = await User.find().limit(limit * 1).skip((page - 1) * limit).exec();
            }

            const count = await User.countDocuments();
            return res.status(200).json({
                users,
                totalPages: Math.ceil(count / limit),
                totalUsers: count,
                currentPage: page
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async startSession(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                return res.status(404).json({ message: 'Email incorrecto' });
            }

            if (!await bcrypt.compare(password, user.password)) {
                return res.status(400).json({ message: 'Incorrect password' });
            }
            user.password = undefined;
            const APP_KEY = process.env.APP_KEY;

            const token = jwt.sign({ user }, APP_KEY);

            return res.status(201).json({
                user,
                token
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async store(req, res) {
        try {
            let user = await User.create(req.body);
            user.password = undefined;

            return res.status(201).json(user);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async update(req, res) {
        try {
            await User.update({ _id: req.params.id }, req.body);

            return res.status(200).json(req.body);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async getAuthUser(req, res) {
        const token = req.query.token;

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }
        const APP_KEY = process.env.APP_KEY;
        let user;
        jwt.verify(token, APP_KEY, async (err, decode) => {
            if (err) {
                return res.status(401).json({ message: 'Token invalid' });
            }

            user = decode.user;
        });

        const realUser = await User.findOne({ email: user.email });
        if (!realUser) {
            return res.status(401).json({ message: 'Token invalid' });
        }
        return res.status(200).json({
            user: realUser,
            token
        });
    }
    async changePassword(req, res) {
        const { current_password, new_password, conf_new_password } = req.body;
        const { id } = req.params;

        try {
            const user = await User.findOne({ _id: id }).select('+password');

            if (!user) {
                return res.status(404).json({ message: 'Usuario não encontrado' });
            }
            if (new_password !== conf_new_password) {
                return res.status(400).json({ message: 'Nova palavra-passe e sua confirmação não conscidem' });
            }

            if (!await bcrypt.compare(current_password, user.password)) {
                return res.status(400).json({ message: 'Palavra-passe atual incorrecta' });
            }

            const hash = await bcrypt.hash(new_password, 10);
            const newUser = await User.updateOne({ _id: id }, { password: hash })

            return res.status(200).json({
                user: newUser
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
}

module.exports = new UserController();