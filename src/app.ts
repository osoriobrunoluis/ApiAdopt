import express, { NextFunction, Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";
import cors from 'cors'
import { routes } from './routes';
import { AppError } from './errors/appError';

export const prisma = new PrismaClient()

export const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    res.status(err.statusCode).send({
      response: 'ERROR',
      status: err.statusCode,
      message: err.message
    })
  }
  console.log(err)

  return res.status(500).send({
    response: 'ERROR',
    status: 500,
    message: 'Internal server error',
    details: {
      error_name: err.name,
      error_message: err.message
    }

  })
})