const User = require('../models/User');

class StudentValidator {
    async store(req, res, next) {
        const { name, password, birthDay, genero, email } = req.body;

        if (!name) {
            return res.status(400).json({
                message: 'Tens de informar o nome do estudante'
            })
        }
        if (!password) {
            return res.status(400).json({
                message: 'Tens de informar a tua palavra-passe.'
            })
        }
        if (!birthDay) {
            return res.status(400).json({
                message: 'Tens de informar a tua data de nascimento.'
            })
        }
        let date = birthDay.split('/');
        if (date.length !== 3) {
            return res.status(400).json({
                message: 'Tens de informar um data no formaro: dia/mês/ano'
            })
        }
        if (date[0] < 1 && date[0] > 31) {
            return res.status(400).json({
                message: 'O dia de nascimento não pode ser maior que 31 e menor que 1'
            })
        }
        if (date[1] < 1 && date[1] > 12) {
            return res.status(400).json({
                message: 'O mês de nascimento não pode ser maior que 12 e menor que 1'
            })
        }
        if (date[2] < 1950) {
            return res.status(400).json({
                message: 'O ano de nascimento não pode ser menor que 1950.'
            })
        }
        if (!genero) {
            return res.status(400).json({
                message: 'Tens de informar o teu genero.'
            })
        }
        if (genero !== "M" && genero !== "F" && genero !== "m" && genro !== "f") {
            return res.status(400).json({
                message: 'Tens de informar o teu genero. M para masculino e F para femenino.'
            })
        }
        if (!email) {
            return res.status(400).json({
                message: 'Tens de informar o teu email.'
            })
        }
        const user = await User.findOne({ email });

        if (user) {
            return res.status(404).json({
                message: `Ja existe um usuario com este email.`
            })
        }
        next();
    }
    async update(req, res, next) {

        next();
    }
}

module.exports = new StudentValidator();