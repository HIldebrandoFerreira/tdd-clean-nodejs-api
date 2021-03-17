/* eslint-disable @typescript-eslint/return-await */
import { SignUpController } from './signup'
import { MissingParamError, InvalidParamError, ServerError } from '../error'
import { EmailValidator } from '../protocols/emial-validator'
import { AddAccount, AddAccountModel } from '../../domain/usercases/add-account'
import { AccountModel } from '../../domain/models/account'
import { HttpResponse } from '../protocols'
import { ok, serverError, badRequest } from '../helpers/http-helper'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeFakeRequest = (): HttpResponse => ({
  statusCode: 200,
  body: {
    name: 'any-name',
    email: 'any-email@mail.com',
    password: 'any-password',
    passwordConfirmation: 'any-password'
  }
})

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeAddAccoount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (accunt: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccoount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('SigNup Controller', () => {
  test('Deve dar erro 400 se não passar o campo name', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any-email@mail.com',
        password: 'any-password',
        passwordConfirmation: 'any-passwordConfirmation'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
  test('Deve dar erro 400 se não passar o campo email', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any-name',
        password: 'any-password',
        passwordConfirmation: 'any-passwordConfirmation'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
  test('Deve dar erro 400 se não passar o campo password', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any-name',
        email: 'any-email@mail.com',
        passwordConfirmation: 'any-passwordConfirmation'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
  test('Deve dar erro 400 se não passar o campo passwordConfirmation', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any-name',
        email: 'any-email@mail.com',
        password: 'any-password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })
  test('Deve dar erro 400 se o formato do e-mai for inválido', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
  test('Deve dar erro 400 se o pawword confirmation for difernete do password', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any-name',
        email: 'invalid-email@mail.com',
        password: 'any-password',
        passwordConfirmation: 'invalid-password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
  })
  test('Deve dar sucesso ao passar o email correto', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(makeFakeRequest())
    expect(isValidSpy).toHaveBeenCalledWith('any-email@mail.com')
  })
  test('Deve dar erro 500 ao levantar exception em EmailValidator', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
  test('Deve chamar o serviço AddAccount com os dados corretos', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any-name',
      email: 'any-email@mail.com',
      password: 'any-password'
    })
  })
  test('Deve dar erro 500 se ouver erro no AddAccout', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
  test('Deve retornar 200 quando os dados forem passados corretamente', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })
})
