import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { createUserService, deleteProfileService, readAllUsersService, readProfileService, updateProfileService } from "../services/user.services";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body

  try {
    for (let key in data) {

      const keys = ['name', 'email', 'password', 'avatar_url']

      if (!keys.includes(key)) {
        throw new AppError("Please verify the informed keys, only: 'name', 'email', 'password', 'avatar_url' are aceptable")
      }
    }
    const user = await createUserService(data)

    return res.send(user)
  } catch (error) {
    next(error)
  }
}

export const readAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await readAllUsersService()

    return res.send(users)
  } catch (error) {
    next(error)
  }
}

export const readProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user

  try {
    const user = await readProfileService(id)

    return res.send(user)
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body
  const { id } = req.user

  try {
    for (let key in data) {

      const keys = ['name', 'avatar_url']

      if (!keys.includes(key)) {
        throw new AppError("Please verify the informed keys, only: 'name' and 'avatar_url' are aceptable")
      }
    }
    const user = await updateProfileService(id, data)

    return res.send(user)
  } catch (error) {
    next(error)
  }
}

export const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user

  try {
    await deleteProfileService (id)

    return res.status(200).send({ message: 'User deleted' })
  } catch (error) {
    next(error)
  }
}
