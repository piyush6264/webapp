const request = require('supertest');
const express = require('express');

const app = express();
app.get('/api', (req, res) => res.json({ msg: 'Hello from backend!' }));

test('GET /api returns message', async () => {
  const res = await request(app).get('/api');
  expect(res.statusCode).toBe(200);
  expect(res.body.msg).toBe('Hello from backend!');
});
