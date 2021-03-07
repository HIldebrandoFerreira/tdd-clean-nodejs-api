import { EmailValidator } from '../presentations/protocols/emial-validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}