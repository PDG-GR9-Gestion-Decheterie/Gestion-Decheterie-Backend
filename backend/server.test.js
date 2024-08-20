import {describe, test, expect} from '@jest/globals';
import app from './server.js';
import request from 'supertest';

describe('The API', () => {
	test('should receive Hello world!', async () => {
		const list = await request(app).get('/');
		expect(list.statusCode).toEqual(200);
		expect(list.text).toEqual('Hello World!');
	});
});