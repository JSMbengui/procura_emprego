const jwt = require('jsonwebtoken');

class Auth {
    async isAuthenticated(req, res, next) {
        const authHeader = req.headers.authorization;
        
        if(!authHeader) {
            return res.status(401).json({ message: 'No token provided'});
        }

        const parts = authHeader.split(' ');

        if(!parts.length === 2) {
            return res.status(401).json({ message: 'Token error' });
        }

        const [ schema, token ] = parts;

        if (!/^Bearer$/i.test(schema)) {
            return res.status(401).json({ message: 'Token bad formated' });
        }

        const APP_KEY = process.env.APP_KEY;

        jwt.verify(token, APP_KEY, (err, decode) => {
            if(err) {
                return res.status(401).json({ message:` Token invalid ${err}` });
            }
            
            req.userId = decode.user._id

            return next();
        })
    }
}

module.exports = new Auth();