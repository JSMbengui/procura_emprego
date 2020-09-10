class CandidatoValidator {
    async store(req, res, next) {
        const { post, user } = req.body;

        if(!post) {
            return res.status(400).json({
                message: 'Tens de informar o id do post'
            })
        }
        if(!user) {
            return res.status(400).json({
                message: 'Tens de informar o id do usuario'
            })
        }
        
        next();
    }
    async update(req, res, next) {
        
        next();
    }
}

module.exports = new CandidatoValidator();