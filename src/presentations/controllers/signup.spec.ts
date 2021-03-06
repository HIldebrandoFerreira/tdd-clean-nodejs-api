import { SigNupcontroller } from './signup'

describe('SigNup Controller', () => {
  test('Whould return 400 if no name is provider', () => {
    const sut = new SigNupcontroller()
    const httpRequest = {
      body: {
        email: 'any-email@mail.com',
        password: 'any-password',
        passwordConfirmation: 'any-passwordConfirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
