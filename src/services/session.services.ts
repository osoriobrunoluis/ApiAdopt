import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { prisma } from "../app"
import { authConfig } from "../config/auth"
import { AppError } from "../errors/appError"

export class AuthService {
  constructor() { }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new AppError('Email not found', 404)
    }

    const passMatch = await compare(password, user.password)

    if (!passMatch) {

      throw new AppError('Please verify the informed password and try again', 401)
    }

    const { expiresIn, secret } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    const { id, password: user_pass, ...res } = user

    return {
      user: { ...res },
      token
    }
  }
} 