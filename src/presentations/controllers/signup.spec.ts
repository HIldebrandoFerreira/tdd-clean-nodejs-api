import { SignUpController } from './signup'
import { MissingParamError } from '../error/missing-param-error'

describe('SigNup Controller', () => {
  test('Deve dar erro 400 se não passar o campo name', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any-email@mail.com',
        password: 'any-password',
        passwordConfirmation: 'any-passwordConfirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('Deve dar erro 400 se não passar o campo email', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any-name',
        password: 'any-password',
        passwordConfirmation: 'any-passwordConfirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
