import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { AuthService } from "../services/session.services";

export class AuthController {
  constructor () {}

  static async login(req: Request, res: Response, next: NextFunction) {
    const data = req.body

    try {
      for (let key in data) {

        const keys = ['email', 'password']

        if (!keys.includes(key)) {
          throw new AppError("Please verify the informed keys, only: 'email' and 'password', are aceptable")
        }
      }

      const authUser = await AuthService.login(data.email, data.password)

      return res.send(authUser)
    } catch (error) {
      next(error)
    }
  }
}