const app = require('../../src/app');
const User = require('../../src/app/models/User');
const request = require('supertest');

describe('User', () => {
    beforeEach(async () => {
        await User.deleteMany();
    })
    it('should be able to start session', async () => {
        await User.create({
            name: 'Joel S. Mbengui',
            email: 'joelsmbengui@gmail.com',
            password: '1234',
            accountBank: '123'
        });

        const responseLogin = await request(app).post('/login').send({
            email: 'joelsmbengui@gmail.com',
            password: '1234'
        });

        expect(responseLogin.body.user.email).toBe('joelsmbengui@gmail.com');
    });
    it('should be able to get account bank', async () => {
        await User.create({
            name: 'Joel S. Mbengui',
            email: 'joelsmbengui@gmail.com',
            password: '1234',
            accountBank: '1234567890'
        });

        const respo = await request(app).get('/account_bank').send({});
        
        expect(respo.body.accountBank).toBe('1234567890');
    });
    it('should fail when start session with invalid credencial', async () => {
        await User.create({
            name: 'Joel S. Mbengui',
            email: 'joelsmbengui@gmail.com',
            password: '1234',
            accountBank: '123'
        });

        const responseLogin = await request(app).post('/login').send({
            email: 'joelsmbengui@gmail.com',
            password: '123465'
        });

        expect(responseLogin.status).toBe(400);
    });
    it('should be able to update user data', async () => {
        const user = await User.create({
            name: 'Joel S. Mbengui',
            email: 'joelsmbengui@gmail.com',
            password: '1234',
            accountBank: '12345678'
        });
        const responseLogin = await request(app).post('/login').send({
            email: 'joelsmbengui@gmail.com',
            password: '1234'
        });
        const token = responseLogin.body.token;
        const respo = await request(app).put(`/user/${user._id}`).send({
            email: 'joelsmbengui1@gmail.com',
            password: '1234'
        }).set('Authorization', `Bearer ${token}`);;
        
        expect(respo.body.email).toBe('joelsmbengui1@gmail.com');
    });
})