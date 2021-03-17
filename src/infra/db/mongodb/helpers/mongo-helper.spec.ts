import { MongoHelper as sut } from './mongo-helper'

describe('Moongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Garantir reconexão caso a mesma caia ', async () => {
    let accountConnection = await sut.getCollection('account')
    expect(accountConnection).toBeTruthy()
    await sut.disconnect()
    accountConnection = await sut.getCollection('account')
    expect(accountConnection).toBeTruthy()
  })
})
