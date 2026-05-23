import request from 'supertest';
import app from '../src/app';

describe('API Routes', () => {
  it('GET / should return hello message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('AI Cloud Cost Optimization Backend API');
  });

  it('GET /api/dashboard should return dashboard metrics', async () => {
    const res = await request(app).get('/api/dashboard');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('totalCost');
  });

  it('GET /api/ai-actions should return an array', async () => {
    const res = await request(app).get('/api/ai-actions');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/chat should echo back message', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'Hello AI' });
    expect(res.status).toBe(200);
    expect(res.body.reply).toContain('Hello AI');
  });
});
