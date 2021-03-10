import bcrypt from 'bcrypt'

export class BcryptAdapter {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 12)
    return hash
  }
}
