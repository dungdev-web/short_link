
import request from 'supertest';
// @ts-ignore
import app from '../../../entrypoint/index';

describe('GET /api/link/:shortCode', () => {
  it('should redirect to originalUrl', async () => {
    // giả sử shortCode gg1234 đã tồn tại trong DB
    const res = await request(app).get('/api/link/PRJA2G');
    expect(res.status).toBe(302);
    expect(res.header.location).toBe('https://gates.com.vn');
  });
});
