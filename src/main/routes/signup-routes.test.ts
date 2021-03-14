import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
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
