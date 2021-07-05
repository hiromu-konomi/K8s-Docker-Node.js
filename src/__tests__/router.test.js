// const { response } = require('../app');
const app = require('../app'),
        request = require('supertest');

describe('routes/index.js', () => {
    it('/', async () => {
        await request(app).get('/')
        .then((response) => {
            expect(response.statusCode).toBe(302);
        });
    });
    it('/register', async () => {
        await request(app).get('/register')
        .then((response) => {
            expect(response.statusCode).toBe(200);
        });
    });
    it('/login', async () => {
        await request(app).get('/login')
        .then((response) => {
            expect(response.statusCode).toBe(200);
        });
    });
});