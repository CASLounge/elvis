import crypto from 'crypto'
import bcrypt from 'bcrypt'

export const useHash = () => {
  // Hashes the password using the bcrypt library
  const hashPassword = async (password: string, saltRounds: number = 10): Promise<string | null> => {
    try {
      const salt = await bcrypt.genSalt(saltRounds)
      const hashedPassword = await bcrypt.hash(password, salt)
      return hashedPassword
    } catch (error) {
      console.error(error)
    }

    return null
  }
  // Compares bare string password to hashed password
  const comparePassword = async (password: string, hash: string) => {
    try {
      return await bcrypt.compare(password, hash)
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const generatePassword = (): string => {
    return crypto.randomBytes(10).toString('hex')
  }

  return {
    hashPassword,
    comparePassword,
    generatePassword
  }
}
