const request = require('supertest');
const app = require('../server'); // Ruta a tu app

describe('POST /auth/login', () => {
    it('Debe devolver un token si las credenciales son correctas', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'usuario@example.com',
                password: '123456'
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});
