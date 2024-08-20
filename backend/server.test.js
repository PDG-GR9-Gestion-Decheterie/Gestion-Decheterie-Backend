const { describe, it, expect } = require('@jest/globals');
const routes = require('./server.js');

describe('The API', () => {
	it('Should receive Hello world!', async () => {
		const list = await request(routes).get('/');
		expect(list.statusCode).toEqual(200);
		expect(list.body).toEqual(['Hello World!']);
	});
});