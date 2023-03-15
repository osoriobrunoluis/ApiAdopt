import {Request, Response, NextFunction} from 'express'
import {ObjectSchema} from 'yup'
import { AppError } from '../errors/appError'

export const inputValidator = (bodySchema: ObjectSchema<any> | null) =>async (req: Request, res: Response, next: NextFunction) => {
  try {
    await bodySchema?.validate(req.body, {
      abortEarly: true
    })

    next()
  } catch (error: any) {
    return res.status(400).send({
      message: error.errors[0]
    })
  }
}