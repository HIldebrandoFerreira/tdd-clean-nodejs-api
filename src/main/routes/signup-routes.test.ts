import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('retonar conta do usuário em caso de sucesso', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Hildebrando',
        email: 'hildebrandoweb@gmail.com',
        password: '123',
        passwordconfirmation: '123'
      })
      .expect(200)
  })
})
