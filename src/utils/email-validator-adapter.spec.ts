import { EmailValidatorAdapter } from './email-validator'

describe('Email Validator Adapter', () => {
  test('Quando retornar false o validador deve retornar false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })
})
