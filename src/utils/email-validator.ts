import { EmailValidator } from '../presentations/protocols/emial-validator'
import validador from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validador.isEmail(email)
  }
}
